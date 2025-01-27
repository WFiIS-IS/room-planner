'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS, type Transform } from '@dnd-kit/utilities';
import { Lightbulb, LightbulbOff } from 'lucide-react';

import { changeLightState } from '@/actions/lights';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { LightState, type LightDevice } from '@/lib/home-assistant/device-types';
import { cn } from '@/lib/utils';

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
  const currentState = item.state;
  const nextState = currentState === LightState.ON ? LightState.OFF : LightState.ON;
  const { listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-light-${item.entityId}`,
    data: { entityId: item.entityId, sceneSlug },
  });
  const changeLightStateAction = changeLightState.bind(null, item.entityId, nextState);
  const isDisabledSubmit = (transform?.x ?? 0) + (transform?.y ?? 0) > 30;

  const finalTransform: Transform = {
    x: (initialTransform?.x ?? 0) + (transform?.x ?? 0),
    y: (initialTransform?.y ?? 0) + (transform?.y ?? 0),
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
      <form action={changeLightStateAction}>
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-blue-500 hover:bg-blue-200"
          disabled={isDisabledSubmit}
        >
          {currentState === LightState.ON ? <Lightbulb /> : <LightbulbOff />}
        </Button>
      </form>
      <Text>{item.attributes?.friendlyName ?? item.entityId}</Text>
    </div>
  );
}
