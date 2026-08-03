import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

// Same directory the upload route writes to.
const STORAGE_DIR =
  process.env.ASSET_UPLOAD_DIR || path.join(process.cwd(), 'storage', 'cdn');

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};

/**
 * Serves uploaded images from STORAGE_DIR at /cdn/<...path>. Filenames are
 * unique+immutable, so responses are cached aggressively (a CDN in front only
 * ever hits this once per file). On Hostinger, if the web server serves
 * public_html/cdn statically it bypasses this route entirely — either way works.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const base = path.resolve(STORAGE_DIR);
  const filePath = path.resolve(base, segments.join('/'));

  // Confine to STORAGE_DIR — reject any traversal outside it.
  if (filePath !== base && !filePath.startsWith(base + path.sep)) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const data = await readFile(filePath);
    const type = CONTENT_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    return new NextResponse(new Uint8Array(data), {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
