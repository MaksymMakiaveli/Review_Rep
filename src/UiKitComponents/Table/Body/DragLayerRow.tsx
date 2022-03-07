import React from 'react';

import { useDragLayer, XYCoord } from 'react-dnd';

function getTransform(currentOffset: XYCoord | null) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y - 20}px)`;
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
      className="drag-layer"
      style={{
        ...getTransform(currentOffset),
      }}
    >
      <span>{item.length}</span>
    </div>
  );
};

export default DragLayerRow;
