import { eq } from 'drizzle-orm';

import { getTransactionContext, type DbTransaction } from '@/data/core';
import { db } from '@/lib/db/client';
import { scene } from '@/lib/db/schema';

export async function getAllScenes() {
  return await db.query.scene.findMany({
    with: {
      fileMetadata: {
        columns: {
          uid: true,
          ext: true,
        },
      },
    },
    columns: {
      slug: true,
      title: true,
    },
    orderBy: (scenes, { asc }) => [asc(scenes.title)],
  });
}

export async function getScene(slug: string) {
  return (
    (await db.query.scene.findFirst({
      where: (scene, { eq }) => eq(scene.slug, slug),
      with: {
        fileMetadata: {
          columns: {
            uid: true,
            ext: true,
          },
        },
      },
      columns: {
        slug: true,
        title: true,
      },
    })) ?? null
  );
}

type SceneInsert = typeof scene.$inferInsert;

export async function insertScene(data: SceneInsert[], _tx?: DbTransaction) {
  const tx = getTransactionContext(_tx);
  return tx.insert(scene).values(data).returning();
}

export async function deleteScene(slug: string, _tx?: DbTransaction) {
  const tx = getTransactionContext(_tx);
  await tx.delete(scene).where(eq(scene.slug, slug));
}
