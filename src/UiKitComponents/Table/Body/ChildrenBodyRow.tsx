import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '@hooks';
import { TableContext } from '../index';
import cl from 'classnames';
import { Collapsing } from '@common';

interface ChildrenBodyRowProps<T = any> {
  itemChild: T;
  closedParent: boolean;
  indentForChildren: number;
  classForChildren?: string[];
}

const ChildrenBodyRow = (props: ChildrenBodyRowProps) => {
  const { itemChild, classForChildren, closedParent, indentForChildren } = props;

  const rowRef = useRef(null);

  const [indentChildren, setIndentChildren] = useState(indentForChildren);

  const { columnsConfig, keyTable, isDraggable = false } = useContext(TableContext);

  const [collapsing, toggleCollapsing] = useToggle(false);

  const navigation = useNavigate();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'table-row',
    drop: (draggingItem) => {
      return {
        focusItem: { ...itemChild },
        draggingItem: { ...draggingItem },
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (draggingItem: typeof itemChild) => {
      if (draggingItem[keyTable] === itemChild[keyTable]) {
        return false;
      } else return draggingItem.parentId !== itemChild[keyTable];
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'table-row',
    item: { ...itemChild },
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
  useEffect(() => {
    setIndentChildren((prevState) => prevState + 10);
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
  console.log(indentChildren);

  drag(drop(rowRef));
  return (
    <>
      <tr
        ref={rowRef}
        className={cl(dragOverClassName, draggingClassName, 'child-row', ...childrenClassName)}
      >
        <td style={{ cursor: checkedChildren ? 'pointer' : 'default' }}>
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
        ? itemChild.children.map((child: any, index: number) => {
            const stripedChildrenClassName = index % 2 !== 0 ? 'child-row-striped' : '';
            return (
              <ChildrenBodyRow
                itemChild={child}
                key={child[keyTable]}
                classForChildren={[collapsingClassName, stripedChildrenClassName]}
                closedParent={collapsing}
                indentForChildren={indentChildren}
              />
            );
          })
        : null}
    </>
  );
};

export default ChildrenBodyRow;
