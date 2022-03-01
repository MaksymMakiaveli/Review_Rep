import React, { useContext, useRef, useState } from 'react';
import { TableContext } from '../index';
import { useDrag, useDrop } from 'react-dnd';
import cl from 'classnames';
import { Collapsing } from '@common';
import { useNavigate } from 'react-router-dom';

interface ChildrenBodyRowProps<T = any> {
  itemChild: T;
  classForChildren?: string[];
}

const ChildrenBodyRow = (props: ChildrenBodyRowProps) => {
  const { itemChild, classForChildren } = props;

  const rowRef = useRef(null);

  const { columnsConfig, keyTable, isDraggable = false } = useContext(TableContext);

  const [collapsing, setCollapsing] = useState(false);

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
      } else if (draggingItem.parentId === itemChild[keyTable]) {
        return false;
      } else {
        return true;
      }
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

  const redirectToPreviewPage = () => navigation(`${itemChild[keyTable]}`);
  const handleExpandableRow = () => {
    setCollapsing(!collapsing);
  };

  const dragOverClassName = isOver && canDrop ? 'row-isDragOver' : '';
  const draggingClassName = isDragging ? 'row-isDragging' : '';
  const classChildren = classForChildren ? classForChildren : [''];

  const checkedChildren = itemChild?.children && itemChild?.children.length;

  drag(drop(rowRef));
  return (
    <>
      <tr ref={rowRef} className={cl(dragOverClassName, draggingClassName, ...classChildren)}>
        <td style={{ cursor: checkedChildren ? 'pointer' : 'default' }}>
          <div className="content" onClick={handleExpandableRow}>
            {checkedChildren ? (
              <span className={cl('icon-collapsing', { 'icon-collapsing-active': collapsing })}>
                <Collapsing />
              </span>
            ) : null}
          </div>
        </td>
        {columnsConfig.map((column, index) => (
          <td key={`${index}-id${itemChild[keyTable]}`}>
            <div className="content" onClick={redirectToPreviewPage}>
              <span>{itemChild[column.dataKey]}</span>
            </div>
          </td>
        ))}
      </tr>
      {checkedChildren
        ? itemChild.children.map((child: any) => {
            const classOpening =
              itemChild[keyTable] === child?.parentId && collapsing ? 'collapsing-row-open' : '';
            return (
              <ChildrenBodyRow
                itemChild={child}
                key={child[keyTable]}
                classForChildren={[
                  'collapsing-row',
                  `child-id-${child[keyTable]}`,
                  'child-row',
                  classOpening,
                ]}
              />
            );
          })
        : null}
    </>
  );
};

export default ChildrenBodyRow;
