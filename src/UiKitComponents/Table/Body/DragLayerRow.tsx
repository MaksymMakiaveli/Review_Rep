import React from 'react';
import { useDragLayer } from 'react-dnd';

function getItemStyles(initialOffset: any, currentOffset: any) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const DragLayerRow = () => {
  const { isDragging, initialOffset, currentOffset } = useDragLayer((monitor) => {
    return {
      isDragging: monitor.isDragging(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      item: monitor.getItem(),
    };
  });

  return isDragging && currentOffset ? (
    <tr style={getItemStyles(currentOffset, initialOffset)}>
      <td>DraggingItem</td>
    </tr>
  ) : null;
};

export default DragLayerRow;
