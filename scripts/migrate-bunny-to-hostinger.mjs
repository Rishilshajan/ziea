/**
 * One-time migration: copy images from BunnyCDN into Hostinger's cdn/ folder and
 * rewrite the image URLs stored in Supabase (products.images, categories.image_url,
 * branding_assets.images) from https://ziea.b-cdn.net/... to your new base.
 *
 * SAFE BY DEFAULT: runs as a DRY RUN unless you pass --apply.
 *
 * USAGE
 *   1) Preview (no changes):
 *        node scripts/migrate-bunny-to-hostinger.mjs
 *   2) Apply for real:
 *        node scripts/migrate-bunny-to-hostinger.mjs --apply
 *
 * WRITE MODES (where the files get copied to)
 *   WRITE_MODE=fs   (default) — write to the local filesystem. Run this ON Hostinger
 *                    via SSH so ASSET_UPLOAD_DIR points at .../public_html/cdn.
 *   WRITE_MODE=sftp          — push over SFTP from your own machine. Requires:
 *                    npm i ssh2-sftp-client   and the SFTP_* env vars below.
 *
 * REQUIRED ENV (reads .env.local)
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   NEXT_PUBLIC_ASSET_BASE_URL   e.g. https://ziea.in/cdn   (the new public base)
 *   WRITE_MODE=fs:   ASSET_UPLOAD_DIR   e.g. /home/u.../public_html/cdn
 *   WRITE_MODE=sftp: SFTP_HOST, SFTP_PORT(=65002), SFTP_USER, SFTP_PASSWORD,
 *                    SFTP_REMOTE_BASE  e.g. public_html/cdn
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

config({ path: '.env.local' });

const APPLY = process.argv.includes('--apply');
const MODE = (process.env.WRITE_MODE || 'fs').toLowerCase();
const BUNNY_PREFIX = 'https://ziea.b-cdn.net/';
const NEW_BASE = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || 'https://ziea.in/cdn').replace(/\/+$/, '');

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const isBunny = (u) => typeof u === 'string' && u.startsWith(BUNNY_PREFIX);
const relPath = (u) => u.slice(BUNNY_PREFIX.length);          // products/x/file.jpg
const newUrl = (u) => `${NEW_BASE}/${relPath(u)}`;            // https://ziea.in/cdn/products/x/file.jpg

const log = (...a) => console.log(...a);

// ── Writers ──────────────────────────────────────────────────────────────────
async function makeFsWriter() {
  const base = process.env.ASSET_UPLOAD_DIR;
  if (!base) throw new Error('ASSET_UPLOAD_DIR is required for WRITE_MODE=fs');
  return {
    async put(rel, buf) {
      const dest = path.join(base, rel);
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, buf);
    },
    async end() {},
  };
}

async function makeSftpWriter() {
  const { default: Client } = await import('ssh2-sftp-client');
  const sftp = new Client();
  await sftp.connect({
    host: process.env.SFTP_HOST,
    port: Number(process.env.SFTP_PORT) || 65002,
    username: process.env.SFTP_USER,
    password: process.env.SFTP_PASSWORD,
  });
  const base = (process.env.SFTP_REMOTE_BASE || 'public_html/cdn').replace(/\/+$/, '');
  const madeDirs = new Set();
  return {
    async put(rel, buf) {
      const remote = `${base}/${rel}`;
      const dir = remote.slice(0, remote.lastIndexOf('/'));
      if (!madeDirs.has(dir)) { await sftp.mkdir(dir, true); madeDirs.add(dir); }
      await sftp.put(buf, remote);
    },
    async end() { await sftp.end(); },
  };
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  log(`\nMode: ${MODE}   ${APPLY ? '*** APPLY (writing changes) ***' : '(dry run — pass --apply to commit)'}\n`);

  const [{ data: products = [] }, { data: categories = [] }, { data: branding = [] }] =
    await Promise.all([
      sb.from('products').select('id, images'),
      sb.from('categories').select('id, image_url'),
      sb.from('branding_assets').select('id, images'),
    ]);

  // Collect every distinct Bunny URL actually referenced.
  const urls = new Set();
  for (const p of products) for (const img of p.images ?? []) if (isBunny(img?.url)) urls.add(img.url);
  for (const c of categories) if (isBunny(c.image_url)) urls.add(c.image_url);
  for (const b of branding) for (const img of b.images ?? []) if (isBunny(img?.url)) urls.add(img.url);

  log(`Found ${urls.size} Bunny image(s) referenced across ` +
      `${products.length} products, ${categories.length} categories, ${branding.length} branding rows.`);
  if (urls.size === 0) { log('Nothing to migrate.'); return; }

  // 1) Copy files (Bunny -> new storage).
  const writer = APPLY ? (MODE === 'sftp' ? await makeSftpWriter() : await makeFsWriter()) : null;
  let copied = 0; const failed = [];
  for (const url of urls) {
    const rel = relPath(url);
    if (!APPLY) { log(`  would copy  ${rel}`); continue; }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await writer.put(rel, Buffer.from(await res.arrayBuffer()));
      copied++;
      log(`  copied      ${rel}`);
    } catch (e) {
      failed.push({ url, error: e.message });
      log(`  FAILED      ${rel}  (${e.message})`);
    }
  }
  if (writer) await writer.end();

  if (failed.length) {
    log(`\n${failed.length} file(s) failed to copy — DB will NOT be rewritten. Fix and re-run.\n`);
    return;
  }

  // 2) Rewrite DB URLs (only after all files copied successfully).
  let rowsUpdated = 0;
  for (const p of products) {
    if (!(p.images ?? []).some((i) => isBunny(i?.url))) continue;
    const images = p.images.map((i) => (isBunny(i?.url) ? { ...i, url: newUrl(i.url) } : i));
    if (APPLY) await sb.from('products').update({ images }).eq('id', p.id);
    rowsUpdated++;
  }
  for (const c of categories) {
    if (!isBunny(c.image_url)) continue;
    if (APPLY) await sb.from('categories').update({ image_url: newUrl(c.image_url) }).eq('id', c.id);
    rowsUpdated++;
  }
  for (const b of branding) {
    if (!(b.images ?? []).some((i) => isBunny(i?.url))) continue;
    const images = b.images.map((i) => (isBunny(i?.url) ? { ...i, url: newUrl(i.url) } : i));
    if (APPLY) await sb.from('branding_assets').update({ images }).eq('id', b.id);
    rowsUpdated++;
  }

  log(`\nDone. Files copied: ${copied}. DB rows ${APPLY ? 'updated' : 'to update'}: ${rowsUpdated}.`);
  if (!APPLY) log('Re-run with --apply to perform the migration.\n');
}

main().catch((e) => { console.error(e); process.exit(1); });
