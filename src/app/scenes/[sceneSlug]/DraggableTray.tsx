'use client';

import { DraggableLight } from '@/app/scenes/[sceneSlug]/DraggableLight';
import type { LightDevice } from '@/lib/home-assistant/device-types';

export type LightDeviceWithPosition = LightDevice & {
  position?: { x: number; y: number };
};

export type LightsProps = {
  lights: LightDevice[];
  sceneSlug: string;
};

export function DraggableTray({ lights, sceneSlug }: LightsProps) {
  return (
    <div className="background-white flex w-full flex-wrap gap-4 rounded-lg p-2 text-xs shadow-md">
      {lights.map((item) => (
        <DraggableLight key={item.entityId} item={item} sceneSlug={sceneSlug} />
      ))}
    </div>
  );
}
