import React, { useContext, useEffect, useRef, useState } from 'react';

import { Collapsing } from '@common';
import { useToggle } from '@hooks';
import cl from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import { TableContext } from '../index';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { CustomCheckbox } from '@UiKitComponents';
import { ResultDrop } from '../TableTypes.type';

interface ChildrenBodyRowProps<T = any> {
  itemChild: T;
  closedParent: boolean;
  indentForChildren: number;
  classForChildren?: string[];
  handleSelectedRow: (item: any, checked: boolean) => void;
  clearSelectedRows: () => void;
  selectedRows: any[];
}

const ChildrenBodyRow = (props: ChildrenBodyRowProps) => {
  const {
    itemChild,
    classForChildren,
    closedParent,
    indentForChildren,
    selectedRows,
    clearSelectedRows,
    handleSelectedRow,
  } = props;

  const rowRef = useRef(null);

  const [indentChildren, setIndentChildren] = useState(indentForChildren);

  const { columnsConfig, keyTable, isDraggable = false, actionForDrag } = useContext(TableContext);

  const [collapsing, toggleCollapsing] = useToggle(false);

  const navigation = useNavigate();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'table-row',
    drop: (draggingItem) => {
      clearSelectedRows();
      return {
        focusItem: itemChild,
        draggingItem: draggingItem,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (draggingItems: typeof itemChild) => {
      const equalsId = draggingItems.some(
        (currentItem: any) => currentItem[keyTable] === itemChild[keyTable]
      );

      return !equalsId;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'table-row',
    item: () => {
      if (selectedRows.some((currentItem) => currentItem[keyTable] === itemChild[keyTable])) {
        return selectedRows;
      } else if (selectedRows.length) {
        handleSelectedRow(itemChild, true);
        return [...selectedRows, itemChild];
      } else {
        return [itemChild];
      }
    },
    end: (item, monitor) => {
      const result: ResultDrop<any> | null = monitor.getDropResult();
      if (result) {
        actionForDrag && actionForDrag(result);
      }
    },
    collect: (monitor) => ({
      isDragging:
        selectedRows.some((currentItem) => currentItem[keyTable] === itemChild[keyTable]) ||
        monitor.isDragging(),
    }),
    canDrag: () => {
      return isDraggable;
    },
  });

  const increaseIndent = () => {
    setIndentChildren(indentChildren + 10);
  };

  useEffect(() => {
    increaseIndent();
  }, []);

  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }, []);

  const redirectToPreviewPage = () => navigation(`${itemChild[keyTable]}`);

  const checkedChildren = itemChild?.children && itemChild?.children.length;

  const dragOverClassName = isOver && canDrop ? 'row-isDragOver' : '';
  const draggingClassName = isDragging ? 'row-isDragging' : '';
  const childrenClassName = classForChildren ? classForChildren : [''];
  const collapsingClassName = collapsing ? 'children-row-show' : 'children-row-hidden';

  if (!closedParent && collapsing) {
    toggleCollapsing();
  }

  drag(drop(rowRef));
  return (
    <>
      <tr
        ref={rowRef}
        className={cl(dragOverClassName, draggingClassName, 'child-row', ...childrenClassName)}
      >
        <td style={{ cursor: checkedChildren ? 'pointer' : 'default' }}>
          {isDraggable && (
            <div className="checkCell">
              <CustomCheckbox
                value={itemChild}
                onChange={handleSelectedRow}
                checked={selectedRows.some(
                  (currentItem) => currentItem[keyTable] === itemChild[keyTable]
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
          <td key={`${index}-id${itemChild[keyTable]}`}>
            <div
              className="content"
              onClick={redirectToPreviewPage}
              style={!index ? { paddingLeft: indentChildren } : undefined}
            >
              <span>{itemChild[column.dataKey]}</span>
            </div>
          </td>
        ))}
      </tr>
      {checkedChildren
        ? itemChild.children.map((child: any) => {
            return (
              <ChildrenBodyRow
                itemChild={child}
                key={child[keyTable]}
                classForChildren={[collapsingClassName]}
                closedParent={collapsing}
                indentForChildren={indentChildren}
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

export default ChildrenBodyRow;
