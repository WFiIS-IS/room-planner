import { fileMetadata, imageMetadata } from '@/lib/db/schema';

import { getTransactionContext, type DbTransaction } from './core';

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
