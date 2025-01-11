'use client';

import { type JSX } from 'react';

// import DraggableItem from './DraggableItem';
import Droppable from './Droppable';

export default function PlanGrid({ children }: { children: JSX.Element }) {
  return (
    <div className="-z-1 relative">
      <div className="absolute bottom-0 left-0 right-0 top-0">
        {/* get height and width of the children item if it exists */}
        It Works
        <Droppable id="1" />
        {/* <DraggableItem id="draggable" label="Drag me" /> */}
      </div>
      {children}
    </div>
  );
}
