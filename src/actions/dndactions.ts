'use server';

import { revalidatePath } from 'next/cache';

import { deleteElementPosition, updateElementPosition } from '@/data/elementPositions';

type UpdateElementPositionParams = {
  elementId: string;
  sceneSlug: string;
  position?: { x: number; y: number } | null;
};

export async function updateElementPositionAction({
  elementId,
  sceneSlug,
  position,
}: UpdateElementPositionParams) {
  if (position) {
    await updateElementPosition({ elementId, sceneSlug, position });
  } else {
    await deleteElementPosition({ sceneSlug, elementId });
  }
  revalidatePath(`/scenes/${sceneSlug}`);
}
