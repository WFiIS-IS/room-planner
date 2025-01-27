import 'server-only';

import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/db/client';
import { elementPositions } from '@/lib/db/schema';

export type ElementPositionInfo = {
  sceneSlug: string;
  elementId: string;
  position: {
    x: number;
    y: number;
  };
};

export type GetElementsPositionsOnSceneParams = {
  sceneSlug: string;
};

export async function getElementsPositionsOnScene({
  sceneSlug,
}: GetElementsPositionsOnSceneParams) {
  const results = await db.query.elementPositions.findMany({
    where: (elementPositions, { eq }) => eq(elementPositions.sceneSlug, sceneSlug),
  });

  if (!results) {
    return {};
  }

  return results.reduce(
    (acc, result) => {
      acc[result.elementId] = {
        sceneSlug: result.sceneSlug,
        elementId: result.elementId,
        position: {
          x: result.x,
          y: result.y,
        },
      };
      return acc;
    },
    {} as Record<string, ElementPositionInfo>,
  );
}

type GetElementPositionParams = {
  elementId: string;
  sceneSlug: string;
  position: { x: number; y: number };
};

export async function updateElementPosition({
  elementId,
  sceneSlug,
  position,
}: GetElementPositionParams) {
  return await db.transaction(async (tx) => {
    if (
      await tx.query.elementPositions.findFirst({
        where: and(
          eq(elementPositions.elementId, elementId),
          eq(elementPositions.sceneSlug, sceneSlug),
        ),
      })
    ) {
      return tx
        .update(elementPositions)
        .set({
          x: position.x,
          y: position.y,
        })
        .where(
          and(eq(elementPositions.sceneSlug, sceneSlug), eq(elementPositions.elementId, elementId)),
        );
    } else {
      return tx.insert(elementPositions).values({
        sceneSlug: sceneSlug,
        elementId: elementId,
        x: position.x,
        y: position.y,
      });
    }
  });
}

type DeleteElementPositionParams = {
  sceneSlug: string;
  elementId: string;
};

export async function deleteElementPosition({ sceneSlug, elementId }: DeleteElementPositionParams) {
  await db
    .delete(elementPositions)
    .where(
      and(eq(elementPositions.elementId, elementId), eq(elementPositions.sceneSlug, sceneSlug)),
    );
}
