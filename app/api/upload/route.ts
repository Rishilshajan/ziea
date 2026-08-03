import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { randomBytes } from 'crypto';
import path from 'path';

// Filesystem writes require the Node.js runtime (not Edge).
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

// Where files land and the public base they are served from. Files are served
// back by app/cdn/[...path]/route.ts (which reads from this same dir), so serving
// works everywhere the Node app runs — no dependency on static-file config.
//   PROD (Hostinger): ASSET_UPLOAD_DIR=/home/<user>/domains/ziea.in/public_html/cdn
//                     NEXT_PUBLIC_ASSET_BASE_URL=https://ziea.in/cdn
//   DEV (defaults):   ./storage/cdn  served at  /cdn
const UPLOAD_DIR =
  process.env.ASSET_UPLOAD_DIR || path.join(process.cwd(), 'storage', 'cdn');
const BASE_URL = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || '/cdn').replace(/\/+$/, '');

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

    // Collision-proof unique name: <timestamp>-<random>-<slug>.<ext>
    const unique = `${Date.now()}-${randomBytes(4).toString('hex')}`;
    const finalName = `${unique}-${slugify(file.name)}.${ext}`;

    const destDir = path.join(UPLOAD_DIR, folder);
    await mkdir(destDir, { recursive: true });
    await writeFile(path.join(destDir, finalName), Buffer.from(await file.arrayBuffer()));

    // Public URL served directly by the web server (offloads the Node app).
    return NextResponse.json({ url: `${BASE_URL}/${folder}/${finalName}` });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Image upload error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
