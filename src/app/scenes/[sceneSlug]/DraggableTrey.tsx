'use client';

import DraggableLight from '@/app/_sidebar/devices-view/DraggableLight';
import type { LightDevice } from '@/lib/home-assistant/device-types';

export type LightsProps = {
  lights: LightDevice[];
};

export function DraggableTrey({ lights }: LightsProps) {
  return (
    <div className="background-white flex w-full flex-wrap gap-4 rounded-lg p-2 text-xs shadow-md">
      {lights.map((item) => (
        <DraggableLight key={item.entityId} item={item} />
      ))}
    </div>
  );
}
