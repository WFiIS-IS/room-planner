'use client';

import { DndContext } from '@dnd-kit/core';

import * as handlers from './dndlisteners';

export type DnDProps = {
  children: React.ReactNode;
};

export function DnD({ children }: DnDProps) {
  return <DndContext {...handlers}>{children}</DndContext>;
}
