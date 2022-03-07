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

  const { columnsConfig, keyTable, isDraggable = false } = useContext(TableContext);

  const navigation = useNavigate();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'table-row',
    drop: (draggingItem) => {
      clearSelectedRows();
      return {
        focusItem: item,
        draggingItem: draggingItem,
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
      const equalsParentId = draggingItems.some(
        (currentItem: any) => currentItem.parentId !== item[keyTable]
      );
      if (equalsId) {
        return false;
      } else return equalsParentId;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'table-row',
    item: () => {
      if (selectedRows.some((currentItem) => currentItem[keyTable] === item[keyTable])) {
        return selectedRows;
      } else {
        handleSelectedRow(item, true);
        return [...selectedRows, item];
      }
    },

    end: (item, monitor) => {
      const result = monitor.getDropResult();
      if (result) {
        console.log(result);
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
        ? item.children.map((child: any, index: number) => {
            const stripedChildrenClassName = index % 2 !== 0 ? 'child-row-striped' : '';
            return (
              <ChildrenBodyRow
                itemChild={child}
                key={child[keyTable]}
                classForChildren={[collapsingClassName, stripedChildrenClassName]}
                closedParent={collapsing}
                indentForChildren={10}
              />
            );
          })
        : null}
    </>
  );
};

export default React.memo(BodyRow);
