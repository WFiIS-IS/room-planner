'use client';

import DraggableLight from '@/app/_sidebar/devices-view/DraggableLight';
import type { LightDevice } from '@/lib/home-assistant/device-types';

export type LightsProps = {
  lights: LightDevice[];
};

export default function DraggableTrey({ lights }: LightsProps) {
  return (
    <div className="background-white max-w-[150px] rounded-lg p-2 text-xs shadow-md">
      {lights.map((item) => (
        <DraggableLight key={item.entityId} item={item} />
      ))}
    </div>
  );
}
