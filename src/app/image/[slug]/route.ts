import { NextResponse, type NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';

import { getImageMetadataByUid } from '@/data/file';
import { getImage } from '@/lib/files';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const searchUid = slug.split('.').at(0);
  if (!searchUid) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: StatusCodes.BAD_REQUEST });
  }
  const metadata = await getImageMetadataByUid(searchUid);
  if (!metadata) {
    return NextResponse.json({ error: 'Not found' }, { status: StatusCodes.NOT_FOUND });
  }
  const imgData = await getImage({ uid: searchUid, ext: metadata.ext });
  if (!imgData) {
    return NextResponse.json({ error: 'Not found' }, { status: StatusCodes.NOT_FOUND });
  }

  const response = new NextResponse(imgData);
  response.headers.set('Content-Type', metadata.contentType);
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  response.headers.set('Content-Length', imgData.length.toString());

  return response;
}
