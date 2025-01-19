'use client';

import type { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

export type DroppableProps = {
  id: string;
  children?: ReactNode;
};

export default function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 1000,
        height: 600,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        border: '1px dashed rgba(0, 0, 0, 0.5)',
        zIndex: -1,
      }}
    >
      {children}
    </div>
  );
}
