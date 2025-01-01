import { fileTypeFromBuffer } from 'file-type';
import imageSize from 'image-size';

export type FileMetadata = {
  contentType: string;
  fileSize: number;
  ext: string;
  originalFilename: string;
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export async function getMetadata(file: File) {
  const fileSize = file.size;
  const bytes = await file.bytes();
  const result = await fileTypeFromBuffer(bytes);

  if (!result) {
    return null;
  }
  const { mime, ext } = result;

  const metadata: FileMetadata = {
    contentType: mime,
    fileSize,
    ext,
    originalFilename: file.name,
  };

  return { metadata, bytes } as const;
}

export async function getImageDimensions(data: Uint8Array): Promise<ImageDimensions> {
  const dimensions = imageSize(data);

  if (!dimensions.width || !dimensions.height) {
    throw new Error('Image dimensions could not be read!');
  }

  return {
    width: dimensions.width,
    height: dimensions.height,
  };
}
