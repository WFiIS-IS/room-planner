'use client';

import type { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

export type SceneTargetProps = {
  children: ReactNode;
  sceneSlug: string;
};

export function SceneTarget({ children, sceneSlug }: SceneTargetProps) {
  const { setNodeRef } = useDroppable({
    id: `scene-${sceneSlug}`,
    data: { sceneSlug },
  });

  return (
    <div aria-label="Scene view" ref={setNodeRef} className="relative">
      {children}
    </div>
  );
}
