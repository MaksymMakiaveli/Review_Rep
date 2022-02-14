import React from 'react';
import { Table } from 'semantic-ui-react';

const MemoizedCell = React.memo(Table.Cell);

interface CellProps {
  readonly itemDataValue: string | number;
}

const Cell = (props: CellProps) => {
  const { itemDataValue } = props;

  return <MemoizedCell textAlign="left">{itemDataValue}</MemoizedCell>;
};

export default React.memo(Cell);
