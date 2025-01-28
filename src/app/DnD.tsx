'use client';

import type { ReactNode } from 'react';
import { DndContext, getClientRect } from '@dnd-kit/core';

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
    >
      {children}
    </DndContext>
  );
}
