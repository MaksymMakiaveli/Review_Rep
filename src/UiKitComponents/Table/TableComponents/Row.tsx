import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndOptions } from '../options';
import { ResultDrop, RowProps } from '../Table.type';
import cl from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { genericMemo } from '@helpers/functions';

function Row<T>(props: RowProps<T>) {
  const { children, rowData, dataKey, selectedRows, handlingSelectedRows, dropAction } = props;
  const rowRef = useRef(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DndOptions.ROW,
    drop: (draggingItems) => ({ area: DndOptions.area.row, drag: draggingItems, drop: rowData }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (draggingItems: any[]) => {
      const equalsId = draggingItems.some((item) => item[dataKey] === rowData[dataKey]);
      return !equalsId;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DndOptions.ROW,
    item: () => {
      const isRow = selectedRows.some((row) => row[dataKey] === rowData[dataKey]);
      if (isRow) {
        return selectedRows;
      }
      if (selectedRows.length) {
        handlingSelectedRows(rowData as T, true);
        return [...selectedRows, rowData];
      }
      return [rowData];
    },
    collect: (monitor) => {
      return {
        isDragging:
          selectedRows.some((item) => item[dataKey] === rowData[dataKey]) || monitor.isDragging(),
      };
    },
    end: (result, monitor) => {
      const resultDrop: ResultDrop<T> | null = monitor.getDropResult();
      if (resultDrop) {
        console.log(resultDrop);
        dropAction(resultDrop);
      }
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }, []);

  const isActive = isOver && canDrop;

  const isActiveClassname = isActive ? 'row-isActive' : '';
  const isDraggingClassname = isDragging ? 'row-isDragging' : '';

  drag(drop(rowRef));

  return (
    <div className={cl(isActiveClassname, isDraggingClassname)} ref={rowRef}>
      {children}
    </div>
  );
}

export default genericMemo(Row);
