import React from 'react';
import { Table } from 'semantic-ui-react';
import HeaderCell from '../HeaderCell';
import { DataKeyType } from '@Types/application.types';

const MemoizedTableHeader = React.memo(Table.Header);
const MemoizedTableRow = React.memo(Table.Row);

interface TableHeaderProps {
  readonly columnsConfig: DataKeyType[];
}

const TableHeader = (props: TableHeaderProps) => {
  const { columnsConfig } = props;
  return (
    <MemoizedTableHeader className="table-ui__header">
      <MemoizedTableRow>
        <HeaderCell />
        {columnsConfig.map((column) => (
          <HeaderCell value={column.label} key={column.key} />
        ))}
      </MemoizedTableRow>
    </MemoizedTableHeader>
  );
};

export default React.memo(TableHeader);
