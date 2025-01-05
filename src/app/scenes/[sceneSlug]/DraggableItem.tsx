import { useDraggable } from '@dnd-kit/core';

export default function DraggableItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    width: 25,
    height: 25,
    backgroundColor: 'rgba(255, 69, 0, 0.8)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'grab',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
}
