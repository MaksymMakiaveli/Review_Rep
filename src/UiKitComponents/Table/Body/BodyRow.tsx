import React, { useContext, useEffect, useRef } from 'react';

import { Collapsing } from '@common';
import { useToggle } from '@hooks';
import cl from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import { TableContext } from '../index';
import ChildrenBodyRow from './ChildrenBodyRow';
import { CustomCheckbox } from '@UiKitComponents';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ResultDrop } from '../TableTypes.type';
import { ItemTypes } from '../ItemTypes';

interface BodyRowProps<T = any> {
  item: T;
  stripedClassName: string;
  handleSelectedRow: (item: any, checked: boolean) => void;
  clearSelectedRows: () => void;
  selectedRows: any[];
}

const BodyRow = (props: BodyRowProps) => {
  const { item, stripedClassName, selectedRows, handleSelectedRow, clearSelectedRows } = props;

  const rowRef = useRef(null);

  const [collapsing, toggleCollapsing] = useToggle(false);

  const { columnsConfig, keyTable, isDraggable = false, actionForDrag } = useContext(TableContext);

  const navigation = useNavigate();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ROW,
    drop: (draggingItem) => {
      clearSelectedRows();
      return {
        focusItem: item,
        draggingItem: draggingItem,
        area: 'ROW',
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (draggingItems: typeof item) => {
      const equalsId = draggingItems.some(
        (currentItem: any) => currentItem[keyTable] === item[keyTable]
      );

      return !equalsId;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.ROW,
    item: () => {
      if (selectedRows.some((currentItem) => currentItem[keyTable] === item[keyTable])) {
        return selectedRows;
      } else if (selectedRows.length) {
        handleSelectedRow(item, true);
        return [...selectedRows, item];
      } else {
        return [item];
      }
    },

    end: (item, monitor) => {
      const result: ResultDrop<any> | null = monitor.getDropResult();
      console.log('result', result, monitor.getItem());
      if (result) {
        actionForDrag && actionForDrag(result);
      }
    },
    collect: (monitor) => ({
      isDragging:
        selectedRows.some((currentItem) => currentItem[keyTable] === item[keyTable]) ||
        monitor.isDragging(),
    }),
    canDrag: () => {
      return isDraggable;
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }, []);

  const redirectToPreviewPage = () => navigation(`${item[keyTable]}`);

  const checkedChildren = item?.children && item?.children.length;

  const dragOverClassName = isOver && canDrop ? 'row-isDragOver' : '';
  const draggingClassName = isDragging ? 'row-isDragging' : '';
  const collapsingClassName = collapsing ? 'children-row-show' : 'children-row-hidden';

  drag(drop(rowRef));
  return (
    <>
      <tr
        ref={rowRef}
        className={cl(dragOverClassName, draggingClassName, 'parent-row', stripedClassName)}
      >
        <td style={{ cursor: checkedChildren ? 'pointer' : 'default' }}>
          {isDraggable && (
            <div className="checkCell">
              <CustomCheckbox
                value={item}
                onChange={handleSelectedRow}
                checked={selectedRows.some(
                  (currentItem) => currentItem[keyTable] === item[keyTable]
                )}
              />
            </div>
          )}
          <div className="content" onClick={toggleCollapsing}>
            {checkedChildren ? (
              <span className={cl('icon-collapsing', { 'icon-collapsing-active': collapsing })}>
                <Collapsing />
              </span>
            ) : null}
          </div>
        </td>
        {columnsConfig.map((column, index) => (
          <td key={`${index}-id${item[keyTable]}`}>
            <div className="content" onClick={redirectToPreviewPage}>
              <span>{item[column.dataKey]}</span>
            </div>
          </td>
        ))}
      </tr>
      {checkedChildren
        ? item.children.map((child: any) => {
            return (
              <ChildrenBodyRow
                itemChild={child}
                key={child[keyTable]}
                classForChildren={[collapsingClassName]}
                closedParent={collapsing}
                indentForChildren={10}
                selectedRows={selectedRows}
                clearSelectedRows={clearSelectedRows}
                handleSelectedRow={handleSelectedRow}
              />
            );
          })
        : null}
    </>
  );
};

export default React.memo(BodyRow);
