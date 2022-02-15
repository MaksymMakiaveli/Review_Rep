import React, { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TableContext } from '../index';

const TableBody = () => {
  const { keyTable } = useContext(TableContext);

  return (
    <Droppable droppableId={keyTable as string}>
      {({ innerRef, droppableProps, placeholder }) => {
        return (
          <tbody className="table-ui__body" ref={innerRef} {...droppableProps}>
            {placeholder}
          </tbody>
        );
      }}
    </Droppable>
  );
};
export default TableBody;
