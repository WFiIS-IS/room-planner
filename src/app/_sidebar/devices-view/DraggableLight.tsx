'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Lightbulb, LightbulbOff } from 'lucide-react';

import { changeLightState } from '@/actions/lights';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { LightState, type LightDevice } from '@/lib/home-assistant/device-types';

export type DraggableLightProps = {
  item: LightDevice;
};

export default function DraggableLight({ item }: DraggableLightProps) {
  const currentState = item.state;
  const nextState = currentState === LightState.ON ? LightState.OFF : LightState.ON;
  const { listeners, setNodeRef, transform, attributes } = useDraggable({
    id: `draggable-light-${item.entityId}`,
  });
  const changeLightStateAction = changeLightState.bind(null, item.entityId, nextState);

  return (
    <div
      style={{
        transform: CSS.Translate.toString(transform),
        zIndex: 1,
      }}
      key={item.entityId}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="relative z-10 flex flex-col items-center justify-center mix-blend-difference"
    >
      <form action={changeLightStateAction}>
        <Button type="submit" size="icon" className="rounded-full bg-blue-500 hover:bg-blue-200">
          {currentState === LightState.ON ? <Lightbulb /> : <LightbulbOff />}
        </Button>
      </form>
      <Text>{item.attributes?.friendlyName ?? item.entityId}</Text>
    </div>
  );
}
