import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export function onDragStart(event: DragStartEvent) {
  console.log('onDragStart', event);
}

export function onDragEnd(event: DragEndEvent) {
  console.log('onDragEnd', event);
}
