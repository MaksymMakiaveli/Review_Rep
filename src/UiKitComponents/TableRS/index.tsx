import React from 'react';
import { Complex, Draggable, Simple, Tree } from './TableVariants';
import { TableProps } from './Table.type';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Table.scss';

function TableRS<T>(props: TableProps<T>) {
  switch (props.type) {
    case 'complex': {
      return (
        <DndProvider backend={HTML5Backend}>
          <Complex {...props} />
        </DndProvider>
      );
    }
    case 'draggable': {
      return (
        <DndProvider backend={HTML5Backend}>
          <Draggable {...props} />
        </DndProvider>
      );
    }
    case 'tree': {
      return <Tree {...props} />;
    }
    case 'simple': {
      return <Simple {...props} />;
    }
    default:
      return null;
  }
}

export default TableRS;
