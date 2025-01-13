'use server';

import { db } from '@/lib/db/client';
import { elementPositions } from '@/lib/db/schema';

export default function checkElementPositionExists(sceneSlug: string, elementId: string) {
  //   todo: implement
}

export async function submitElementPosition(
  sceneSlug: string,
  elementId: string,
  position: { x: number; y: number },
) {
  return await db.transaction(async (tx) => {
    await tx.insert(elementPositions).values({
      elementUid: elementId,
      x: position.x,
      y: position.y,
    });
  });
}
