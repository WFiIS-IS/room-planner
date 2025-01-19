'use client';

import { type JSX } from 'react';

// import DraggableItem from './DraggableItem';
import Droppable from './Droppable';

export default function PlanGrid({ children }: { children: JSX.Element }) {
  return (
    <div className="-z-1 relative h-[600px] w-[1000px]">
      {children}
      <div className="absolute bottom-0 left-0 right-0 top-0">
        {/* get height and width of the children item if it exists */}
        <Droppable id="grid_droppable" />
        {/* <DraggableItem id="draggable" label="Drag me" /> */}
      </div>
    </div>
  );
}
