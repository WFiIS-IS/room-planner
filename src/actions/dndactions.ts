'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/db/client';
import { elementPositions, scene, scenesToElements } from '@/lib/db/schema';

export default function checkElementPositionExists(sceneSlug: string, elementId: string) {
  // if sceneSlug and elementID exists in db return true
  return db
    .select()
    .from(elementPositions)
    .innerJoin(scenesToElements, eq(scenesToElements.elementUid, elementPositions.elementUid))
    .innerJoin(scene, eq(scene.slug, scenesToElements.sceneSlug))
    .where(and(eq(elementPositions.elementUid, elementId), eq(scene.slug, sceneSlug)));
}

export async function submitElementPosition(
  sceneSlug: string,
  elementId: string,
  position: { x: number; y: number },
) {
  return await db.transaction(async (tx) => {
    if (await checkElementPositionExists(sceneSlug, elementId)) {
      return await tx.update(elementPositions).set({
        x: position.x,
        y: position.y,
      });
    } else {
      return await tx.insert(elementPositions).values({
        elementUid: elementId,
        x: position.x,
        y: position.y,
      });
    }
  });
}
