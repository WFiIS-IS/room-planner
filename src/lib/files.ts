import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import { fileTypeFromBuffer } from 'file-type';
import fse from 'fs-extra';
import imageSize from 'image-size';

import { insertFileMetadata, insertImageMetadata } from '@/data/file';
import { env } from '@/env/server';
import { db } from '@/lib/db/client';

export const MEDIA_ROOT = path.join(env.DATA_DIR, 'media');

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

export async function ensureMediaRoot() {
  await fs.mkdir(MEDIA_ROOT, {
    recursive: true,
  });
}

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

async function _saveMedia(fileName: string, bytes: Uint8Array) {
  const filePath = path.join(MEDIA_ROOT, fileName);
  await fs.writeFile(filePath, bytes);
}

async function _readMedia(fileName: string) {
  const filePath = path.join(MEDIA_ROOT, fileName);
  if (!(await fse.pathExists(filePath))) {
    return null;
  }
  return fs.readFile(filePath);
}

type GetImageArgs = {
  uid: string;
  ext: string;
};

export async function getImage({ uid, ext }: GetImageArgs) {
  const fileName = `${uid}.${ext}`;
  return await _readMedia(fileName);
}

type SaveImageArgs = {
  data: Uint8Array;
  metadata: FileMetadata & ImageDimensions;
};
export async function saveImage({ data, metadata }: SaveImageArgs) {
  return await db.transaction(async (tx) => {
    const insertedMetadata = (await insertFileMetadata([metadata], tx)).at(0);
    if (!insertedMetadata) {
      throw new Error('Failed to insert file metadata!');
    }

    const fileName = `${insertedMetadata.uid}.${metadata.ext}`;
    await _saveMedia(fileName, data);
    const imageMetadata = (
      await insertImageMetadata([{ fileMetadata: insertedMetadata.uid, ...metadata }], tx)
    ).at(0);
    if (!imageMetadata) {
      throw new Error('Failed to insert image metadata!');
    }
    return {
      metadata: insertedMetadata,
      imageMetadata,
      filesystemImageName: fileName,
    };
  });
}
