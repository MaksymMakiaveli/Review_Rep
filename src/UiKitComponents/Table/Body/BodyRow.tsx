import React, { useContext, useRef } from 'react';
import { ObjectKeysString } from '@Types/application.types';
import { TableContext } from '../index';
import { useDrag, useDrop } from 'react-dnd';
import cl from 'classnames';

interface BodyRowProps<Object extends ObjectKeysString = any> {
  item: Object;
}

type ItemDropObject = {
  itemId: number;
};

const BodyRow = (props: BodyRowProps) => {
  const { item } = props;
  const { columnsConfig, keyTable, isDraggable = false } = useContext(TableContext);
  const rowRef = useRef(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'table-row',
    drop: (items) => {
      return {
        focusDropItem: item[keyTable],
        draggedItemId: items.itemId,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      droppedItemId: item[keyTable],
    }),
    canDrop: (items: ItemDropObject) => {
      return items.itemId !== item[keyTable];
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'table-row',
    item: { itemId: item[keyTable] },
    end: (item, monitor) => {
      console.log(monitor.getDropResult());
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
      return isDraggable;
    },
  });

  const dragOverClassName = isOver && canDrop ? 'row-isDragOver' : '';
  const draggingClassName = isDragging ? 'row-isDragging' : '';

  drag(drop(rowRef));
  return (
    <>
      <tr ref={rowRef} className={cl(dragOverClassName, draggingClassName)}>
        {columnsConfig.map((column) => (
          <td key={column.dataKey as string}>{item[column.dataKey]}</td>
        ))}
      </tr>
    </>
  );
};

export default BodyRow;
