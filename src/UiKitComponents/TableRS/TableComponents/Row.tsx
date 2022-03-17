import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DnDOptions } from '../DnDOptions';
import { RowProps } from '../Table.type';
import cl from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';

function Row(props: RowProps) {
  const {
    children,
    rowData,
    dataKey,
    selectedRows,
    handlingSelectedRows,
    onDropRow,
    clearSelectedRows,
    isDraggable,
  } = props;
  const rowRef = useRef(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DnDOptions.ROW,
    drop: (draggingItems) => {
      const dropObject = {
        area: DnDOptions.area.row,
        drag: draggingItems,
        drop: rowData,
      };
      onDropRow && onDropRow(dropObject);
      clearSelectedRows && clearSelectedRows();
    },
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
    type: DnDOptions.ROW,
    item: () => {
      const isRow = selectedRows && selectedRows.some((row) => row[dataKey] === rowData[dataKey]);
      if (isRow) {
        return selectedRows;
      }
      if (selectedRows && selectedRows.length) {
        handlingSelectedRows && handlingSelectedRows(rowData, true);
        return [...selectedRows, rowData];
      }
      return [rowData];
    },
    collect: (monitor) => {
      return {
        isDragging:
          (selectedRows && selectedRows.some((item) => item[dataKey] === rowData[dataKey])) ||
          monitor.isDragging(),
      };
    },
    canDrag: () => {
      return !!isDraggable;
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
    <div className={cl('cell-wrapper', isActiveClassname, isDraggingClassname)} ref={rowRef}>
      {children}
    </div>
  );
}

export default Row;
