import React from 'react';
import { Table } from 'semantic-ui-react';

const MemoizedHeaderCell = React.memo(Table.HeaderCell);

interface HeaderCellProps {
  readonly value?: string | number;
}

const HeaderCell = (props: HeaderCellProps) => {
  const { value } = props;
  return <MemoizedHeaderCell className="header-cell">{value}</MemoizedHeaderCell>;
};

export default React.memo(HeaderCell);
