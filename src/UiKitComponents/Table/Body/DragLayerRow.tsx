import React from 'react';

import { useDragLayer, XYCoord } from 'react-dnd';

function getItemStyles(currentOffset: XYCoord | null) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const DragLayerRow = () => {
  const { isDragging, currentOffset, item } = useDragLayer((monitor) => {
    return {
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getClientOffset(),
      item: monitor.getItem(),
    };
  });

  if (!isDragging) {
    return null;
  }

  return (
    <div
      style={{
        ...getItemStyles(currentOffset),
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        right: 0,
        top: 0,
        width: '30px',
        height: '30px',
        background: '#ccc',
        borderRadius: '50%',
        textAlign: 'center',
      }}
    >
      <span>{item.length}</span>
    </div>
  );
};

export default DragLayerRow;
