import React from 'react';
import { Complex, Draggable, Simple, Tree } from './TableVariants';
import { TableProps } from './Table.type';
import './Table.scss';

function TableRS<T>(props: TableProps<T>) {
  switch (props.type) {
    case 'complex': {
      return <Complex {...props} />;
    }
    case 'draggable': {
      return <Draggable {...props} />;
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
