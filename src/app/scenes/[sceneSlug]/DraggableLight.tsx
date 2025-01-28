'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { useDndMonitor, useDraggable, type DragEndEvent, type DragMoveEvent } from '@dnd-kit/core';
import { CSS, type Transform } from '@dnd-kit/utilities';
import { Lightbulb, LightbulbOff } from 'lucide-react';

import { updateElementPositionAction } from '@/actions/dndactions';
import { changeLightState } from '@/actions/lights';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { LightState, type LightDevice } from '@/lib/home-assistant/device-types';
import { mainLogger } from '@/lib/logger';
import { cn } from '@/lib/utils';

const logger = mainLogger.child({ name: 'DraggableLight.tsx' });

export type DraggableLightProps = {
  item: LightDevice;
  initialTransform?: { x: number; y: number };
  sceneSlug: string;
  className?: string;
};

export function DraggableLight({
  item,
  initialTransform,
  sceneSlug,
  className,
}: DraggableLightProps) {
  const id = `draggable-light-${item.entityId}`;
  const entityId = item.entityId;
  const [, startTransition] = useTransition();
  const [disabled, setDisabled] = useState(false);
  const [lightState, setLightState] = useOptimistic(item.state);
  const [optimisticInitialTransform, changeOptimisticInitialTransform] =
    useOptimistic(initialTransform);
  const { listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { entityId: item.entityId, sceneSlug },
  });
  useDndMonitor({
    onDragMove(event: DragMoveEvent) {
      if (event.active.id !== id) {
        return;
      }

      const delta = Math.abs(event.delta.x) + Math.abs(event.delta.y);
      if (delta > 1) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    },
    onDragEnd(event: DragEndEvent) {
      if (event.active.id !== id) {
        return;
      }

      setDisabled(false);

      logger.debug(`Drag end event ${JSON.stringify({ entityId, sceneSlug })}`, {
        entityId,
        sceneSlug,
      });

      if (!event.over) {
        logger.info(`Removing entity \'${entityId}\' from scene \'${sceneSlug}\'`, {
          entityId,
          sceneSlug,
        });
        startTransition(async () => {
          changeOptimisticInitialTransform(undefined);
          await updateElementPositionAction({ elementId: entityId, sceneSlug, position: null });
        });
        return;
      }

      const sceneRect = event.over.rect;
      const elementRect = event.active.rect.current.translated!;

      const x = elementRect.left - sceneRect.left;
      const y = elementRect.top - sceneRect.top;

      logger.info(
        `Moving entity \'${entityId}\' to position ${x}, ${y} in scene \'${sceneSlug}\'`,
        {
          entityId,
          sceneSlug,
          x,
          y,
        },
      );
      startTransition(async () => {
        changeOptimisticInitialTransform({ x, y });
        await updateElementPositionAction({ elementId: entityId, sceneSlug, position: { x, y } });
      });
    },
  });

  const finalTransform: Transform = {
    x: (optimisticInitialTransform?.x ?? 0) + (transform?.x ?? 0),
    y: (optimisticInitialTransform?.y ?? 0) + (transform?.y ?? 0),
    scaleX: transform?.scaleX ?? 1,
    scaleY: transform?.scaleY ?? 1,
  };

  return (
    <div
      style={{
        transform: CSS.Translate.toString(finalTransform),
        zIndex: 1,
      }}
      key={item.entityId}
      ref={setNodeRef}
      {...listeners}
      className={cn(
        'relative z-10 flex flex-col items-center justify-center mix-blend-difference',
        className,
      )}
    >
      <form
        action={async () => {
          const nextState = lightState === LightState.ON ? LightState.OFF : LightState.ON;
          setLightState(nextState);
          await changeLightState(item.entityId, nextState);
        }}
      >
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-blue-500 hover:bg-blue-200"
          disabled={disabled}
        >
          {lightState === LightState.ON ? <Lightbulb /> : <LightbulbOff />}
        </Button>
      </form>
      <Text>{item.attributes?.friendlyName ?? item.entityId}</Text>
    </div>
  );
}
