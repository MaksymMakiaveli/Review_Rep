import React, { useContext, useRef } from 'react';

import { Collapsing } from '@common';
import { useToggle } from '@hooks';
import cl from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import { TableContext } from '../index';
import ChildrenBodyRow from './ChildrenBodyRow';

interface BodyRowProps<T = any> {
  item: T;
  stripedClassName: string;

  selectedRows: number[];
  handleSelectedRows: (id: number, checked: boolean) => void;
}

const BodyRow = (props: BodyRowProps) => {
  const { item, stripedClassName, selectedRows, handleSelectedRows } = props;

  const rowRef = useRef(null);

  const [collapsing, toggleCollapsing] = useToggle(false);

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
      } else return draggingItem.parentId !== item[keyTable];
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
    isDragging: () => {
      return selectedRows.includes(item[keyTable]);
    },
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectedRows(item[keyTable], event.target.checked);
  };

  const valueCheckbox = selectedRows.some((id) => id === item[keyTable]);

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
          <div className="content" onClick={toggleCollapsing}>
            {checkedChildren ? (
              <span className={cl('icon-collapsing', { 'icon-collapsing-active': collapsing })}>
                <Collapsing />
              </span>
            ) : null}
            <input type="checkbox" checked={valueCheckbox} onChange={onChange} />
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
