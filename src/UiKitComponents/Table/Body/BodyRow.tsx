import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { TableContext } from '../index';
import { useDrag, useDrop } from 'react-dnd';
import cl from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Collapsing } from '@common';
import ChildrenBodyRow from './ChildrenBodyRow';

interface BodyRowProps<T = any> {
  item: T;
  setNodeListParentRow: (tableRow: RefObject<HTMLTableRowElement>[]) => void;
  classForChildren?: string[];
}

const BodyRow = (props: BodyRowProps) => {
  const { item, classForChildren, setNodeListParentRow } = props;

  const rowRef = useRef(null);

  const [collapsing, setCollapsing] = useState(false);

  const { columnsConfig, keyTable, isDraggable = false } = useContext(TableContext);

  const navigation = useNavigate();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'table-row',
    drop: (draggingItem) => {
      return {
        focusItem: { ...item },
        draggingItem: { ...draggingItem },
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (draggingItem: typeof item) => {
      if (draggingItem[keyTable] === item[keyTable]) {
        return false;
      } else if (draggingItem.parentId === item[keyTable]) {
        return false;
      } else {
        return true;
      }
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

  useEffect(() => {
    setNodeListParentRow([rowRef]);
  }, []);

  const redirectToPreviewPage = () => navigation(`${item[keyTable]}`);
  const handleExpandableRow = () => {
    setCollapsing(!collapsing);
  };

  const dragOverClassName = isOver && canDrop ? 'row-isDragOver' : '';
  const draggingClassName = isDragging ? 'row-isDragging' : '';
  const classChildren = classForChildren ? classForChildren : [''];

  const checkedChildren = item?.children && item?.children.length;
  const checkedIsParent = item?.parentId === null ? 'parent-row' : '';

  drag(drop(rowRef));
  return (
    <>
      <tr
        ref={rowRef}
        className={cl(
          dragOverClassName,
          draggingClassName,
          ...classChildren,
          checkedIsParent,
          'row'
        )}
      >
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
          <td key={`${index}-id${item[keyTable]}`}>
            <div className="content" onClick={redirectToPreviewPage}>
              <span>{item[column.dataKey]}</span>
            </div>
          </td>
        ))}
      </tr>
      {checkedChildren
        ? item.children.map((child: any) => {
            const classOpening =
              item[keyTable] === child?.parentId && collapsing ? 'collapsing-row-open' : '';

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

export default React.memo(BodyRow);
