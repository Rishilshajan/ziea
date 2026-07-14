import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const apiKey = process.env.BUNNY_STORAGE_API_KEY;
    const storageZone = process.env.BUNNY_STORAGE_ZONE_NAME;
    const pullZone = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE;

    if (!apiKey || !storageZone || !pullZone) {
      return NextResponse.json({ error: 'BunnyCDN credentials not configured' }, { status: 500 });
    }

    // Generate a unique filename to avoid overwrites
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const finalFileName = `${timestamp}-${cleanFileName}`;
    
    const fileBuffer = await file.arrayBuffer();

    // Get region prefix (empty for default Falkenstein, otherwise e.g. 'sg.', 'ny.')
    const region = process.env.BUNNY_STORAGE_REGION || '';
    const regionPrefix = region ? `${region}.` : '';
    
    // Upload to BunnyCDN Storage
    // Storage API endpoint format: https://[region].storage.bunnycdn.com/{storageZoneName}/{path}/{filename}
    const uploadUrl = `https://${regionPrefix}storage.bunnycdn.com/${storageZone}/${folder}/${finalFileName}`;
    
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': apiKey,
        'Content-Type': 'application/octet-stream',
      },
      body: fileBuffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('BunnyCDN Upload Error:', errorText);
      return NextResponse.json({ error: 'Failed to upload to CDN' }, { status: 500 });
    }

    // Return the public CDN URL
    const publicUrl = `https://${pullZone}/${folder}/${finalFileName}`;
    
    return NextResponse.json({ url: publicUrl });

  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
