'use client';

import { type JSX } from 'react';
import { useDroppable } from '@dnd-kit/core';

export type DroppableProps = {
  id: string;
  children: JSX.Element;
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
