import { eq } from 'drizzle-orm';
import { omit } from 'radashi';

import { fileMetadata, imageMetadata } from '@/lib/db/schema';

import { getTransactionContext, takeUnique, type DbTransaction } from './core';

type FileInsert = Omit<typeof fileMetadata.$inferInsert, 'uid'>;

export async function insertFileMetadata(data: FileInsert[], _tx?: DbTransaction) {
  const tx = getTransactionContext(_tx);
  return tx.insert(fileMetadata).values(data).returning();
}

type ImageMetadataInsert = typeof imageMetadata.$inferInsert;

export async function insertImageMetadata(data: ImageMetadataInsert[], _tx?: DbTransaction) {
  const tx = getTransactionContext(_tx);
  return tx.insert(imageMetadata).values(data).returning();
}

export async function getImageMetadataByUid(uid: string, _tx?: DbTransaction) {
  const tx = getTransactionContext(_tx);
  const data = await tx
    .select()
    .from(imageMetadata)
    .where(eq(imageMetadata.fileMetadata, uid))
    .innerJoin(fileMetadata, eq(fileMetadata.uid, imageMetadata.fileMetadata))
    .then(takeUnique);

  if (!data) {
    return null;
  }

  return {
    ...omit(data.image_metadata, ['fileMetadata']),
    ...data.file_metadata,
  };
}
