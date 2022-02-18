import React, { useContext, useRef } from 'react';
import { TableContext } from '../index';
import { useDrag, useDrop } from 'react-dnd';
import cl from 'classnames';

interface BodyRowProps<T = any> {
  item: T;
}

const BodyRow = (props: BodyRowProps) => {
  const { item } = props;
  const { columnsConfig, keyTable, isDraggable = false } = useContext(TableContext);
  const rowRef = useRef(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'table-row',
    drop: (items) => {
      return {
        focusItem: { ...item },
        draggingItem: { ...items },
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (draggingItem: typeof item) => {
      return draggingItem[keyTable] !== item[keyTable];
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'table-row',
    item: { ...item },
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
          <td key={column.dataKey.toString()}>{item[column.dataKey]}</td>
        ))}
      </tr>
    </>
  );
};

export default BodyRow;
