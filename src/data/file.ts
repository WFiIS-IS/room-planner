import { eq } from 'drizzle-orm';
import { omit } from 'radashi';

import { fileMetadata, imageMetadata, scene } from '@/lib/db/schema';

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
    .where(eq(imageMetadata.fileMetadataUid, uid))
    .innerJoin(fileMetadata, eq(fileMetadata.uid, imageMetadata.fileMetadataUid))
    .then(takeUnique);

  if (!data) {
    return null;
  }

  return {
    ...omit(data.image_metadata, ['fileMetadataUid']),
    ...data.file_metadata,
  };
}

export async function checkSceneExists(slug: string, _tx?: DbTransaction) {
  const tx = getTransactionContext(_tx);
  return tx.select().from(scene).where(eq(scene.slug, slug)).then(takeUnique);
}
