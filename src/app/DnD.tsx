'use client';

import type { ReactNode } from 'react';
import { DndContext, getClientRect, type DragEndEvent } from '@dnd-kit/core';

import { updateElementPositionAction } from '@/actions/dndactions';
import { mainLogger } from '@/lib/logger';

const logger = mainLogger.child({ name: 'DnD.tsx' });

export function onDragEnd(event: DragEndEvent) {
  const entityId = event.active.data.current?.entityId as string;
  const sceneSlug = event.active.data.current?.sceneSlug as string;

  logger.debug(`Drag end event ${JSON.stringify({ entityId, sceneSlug })}`, {
    entityId,
    sceneSlug,
  });

  if (!event.over) {
    logger.info(`Removing entity \'${entityId}\' from scene \'${sceneSlug}\'`, {
      entityId,
      sceneSlug,
    });
    void updateElementPositionAction({ elementId: entityId, sceneSlug, position: null });
    return;
  }

  const sceneRect = event.over.rect;
  const elementRect = event.active.rect.current.translated!;

  const x = elementRect.left - sceneRect.left;
  const y = elementRect.top - sceneRect.top;

  logger.info(`Moving entity \'${entityId}\' to position ${x}, ${y} in scene \'${sceneSlug}\'`, {
    entityId,
    sceneSlug,
    x,
    y,
  });
  void updateElementPositionAction({ elementId: entityId, sceneSlug, position: { x, y } });
}

export type DnDProps = {
  children: ReactNode;
};

export function DnD({ children }: DnDProps) {
  return (
    <DndContext
      measuring={{
        draggable: {
          measure: getClientRect,
        },
      }}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
}
