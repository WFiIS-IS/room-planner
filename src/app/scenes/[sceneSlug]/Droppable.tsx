'use client';

import { type JSX } from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable({ id }: { id: string }) {
  const { setNodeRef } = useDroppable({
    id,
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
      }}
    />
  );
}
