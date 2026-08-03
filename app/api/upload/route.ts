import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const MAX_BYTES = 15 * 1024 * 1024; // 15 MB per image

// Only these image types are accepted; the value is the extension we save with.
const ALLOWED_TYPES = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
  ['image/avif', 'avif'],
  ['image/svg+xml', 'svg'],
]);

// TEMP (works on Vercel/serverless): upload to a public Supabase Storage bucket.
// Swap back to the Hostinger filesystem implementation (commented at the bottom)
// once the app runs on Hostinger as a Node app.
const STORAGE_BUCKET = 'Testing';

/** Turn an original filename into a short, url-safe slug (no extension). */
function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'file'
  );
}

/** Sanitize a caller-supplied folder into safe nested segments (no traversal). */
function safeFolder(input: string): string {
  return (
    input
      .split('/')
      .map((seg) => seg.replace(/[^a-zA-Z0-9._-]/g, '_'))
      .filter((seg) => seg && seg !== '.' && seg !== '..')
      .join('/') || 'uploads'
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = safeFolder((formData.get('folder') as string) || 'uploads');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const ext = ALLOWED_TYPES.get(file.type);
    if (!ext) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type || 'unknown'}` },
        { status: 415 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File too large (max 15MB)' }, { status: 413 });
    }

    // Collision-proof unique key: <folder>/<timestamp>-<random>-<slug>.<ext>
    const unique = `${Date.now()}-${randomBytes(4).toString('hex')}`;
    const objectPath = `${folder}/${unique}-${slugify(file.name)}.${ext}`;

    // Service-role client — server-side only, bypasses storage RLS for the
    // admin upload. Never exposed to the browser.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(objectPath, Buffer.from(await file.arrayBuffer()), {
        contentType: file.type,
        upsert: false,
      });
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Image upload error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/* ───────────────────────────────────────────────────────────────────────────
 * HOSTINGER FILESYSTEM STORAGE — restore this block (and remove the Supabase
 * block above) once the app is deployed on Hostinger as a Node app. Requires:
 *   ASSET_UPLOAD_DIR=/home/<user>/.../public_html/cdn
 *   NEXT_PUBLIC_ASSET_BASE_URL=https://ziea.in/cdn
 * (Also re-add: import { writeFile, mkdir } from 'fs/promises'; import path from 'path';)
 *
 * const UPLOAD_DIR =
 *   process.env.ASSET_UPLOAD_DIR || path.join(process.cwd(), 'storage', 'cdn');
 * const BASE_URL = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || '/cdn').replace(/\/+$/, '');
 *
 * // inside POST, replacing the Supabase upload:
 * const unique = `${Date.now()}-${randomBytes(4).toString('hex')}`;
 * const finalName = `${unique}-${slugify(file.name)}.${ext}`;
 * const destDir = path.join(UPLOAD_DIR, folder);
 * await mkdir(destDir, { recursive: true });
 * await writeFile(path.join(destDir, finalName), Buffer.from(await file.arrayBuffer()));
 * return NextResponse.json({ url: `${BASE_URL}/${folder}/${finalName}` });
 * ─────────────────────────────────────────────────────────────────────────── */
