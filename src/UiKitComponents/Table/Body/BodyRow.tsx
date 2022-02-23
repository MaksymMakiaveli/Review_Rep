import React, { useContext, useRef, useState } from 'react';
import { TableContext } from '../index';
import { useDrag, useDrop } from 'react-dnd';
import cl from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { useToggle } from '@hooks';
import { DropArrow } from '@common';

interface BodyRowProps<T = any> {
  item: T;
}

const BodyRow = (props: BodyRowProps) => {
  const { item } = props;
  const { columnsConfig, keyTable, isDraggable = false } = useContext(TableContext);
  const rowRef = useRef(null);
  const navigation = useNavigate();
  const [openRow, setOpenRow] = useToggle();
  const [visibleIconDrop] = useState(false);

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
  const redirectToPreviewPage = () => navigation(`${item[keyTable]}`);

  const dragOverClassName = isOver && canDrop ? 'row-isDragOver' : '';
  const draggingClassName = isDragging ? 'row-isDragging' : '';

  drag(drop(rowRef));
  return (
    <>
      <tr ref={rowRef} className={cl(dragOverClassName, draggingClassName)}>
        <Table.Cell collapsing>
          <div className="content">
            <span>
              {visibleIconDrop ? (
                <button onClick={setOpenRow} style={{ background: 'transparent' }}>
                  <span className={cl('drop-arrow', { 'open-drop-arrow': openRow })}>
                    <DropArrow color="blue" />
                  </span>
                </button>
              ) : null}
            </span>
          </div>
        </Table.Cell>
        {columnsConfig.map((column) => (
          <td key={column.dataKey.toString()}>
            <div className="content" onClick={redirectToPreviewPage}>
              <span>{item[column.dataKey]}</span>
            </div>
          </td>
        ))}
      </tr>
    </>
  );
};

export default BodyRow;
