'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Lightbulb, LightbulbOff } from 'lucide-react';

// import { SidebarButtonLink } from '../SidebarButtonLink';
// import { LightSwitch } from './LightSwitch';
import { changeLightState } from '@/actions/lights';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { SidebarMenuItem } from '@/components/ui/sidebar';
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
    <Card
      style={{
        // transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,

        transform: CSS.Translate.toString(transform),
        zIndex: 1,
      }}
      key={item.entityId}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="relative z-10"
    >
      <CardContent className="my-2 flex flex-col items-center gap-4">
        <Text variant="h4">{item.attributes?.friendlyName ?? item.entityId}</Text>
        {/* <SidebarButtonLink href={`/devices/lights/${item.entityId}`}>
          <Text>{item.attributes?.friendlyName ?? item.entityId}</Text>
        </SidebarButtonLink> */}
        {/* <LightSwitch currentState={item.state} entityId={item.entityId} /> */}
        <form action={changeLightStateAction}>
          <Button type="submit">
            {currentState === LightState.ON ? <Lightbulb /> : <LightbulbOff />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
