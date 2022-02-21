import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import { TableContext } from '../index';
import cl from 'classnames';
import { Sorted } from '@common';

interface HeaderProps {
  column: string | null;
  direction: 'descending' | 'ascending' | undefined;
  sortedColumn: (columnsName: string | null) => () => void;
}

const Header = (props: HeaderProps) => {
  const { columnsConfig } = useContext(TableContext);
  const { column, direction, sortedColumn } = props;

  const iconSort = (directionColumn: typeof direction, nameColumn: string): React.ReactNode => {
    if (directionColumn === 'ascending' && nameColumn === column) {
      return <Sorted.SortedArrowASC />;
    } else if (directionColumn === 'descending' && nameColumn === column) {
      return <Sorted.SortedArrowDESC />;
    } else {
      return <Sorted.SortedArrowDefault />;
    }
  };

  return (
    <thead className="table-ui__header">
      <tr>
        {columnsConfig.map((columns) => (
          <Table.HeaderCell
            sorted={column === columns.dataKey ? direction : undefined}
            onClick={columns.isSorted && sortedColumn(columns.dataKey as string)}
            key={columns.dataKey.toString()}
            className={cl('header-cell', { 'header-cell-sorted': columns.isSorted })}
          >
            {columns.title}
            <span>{columns.isSorted && iconSort(direction, columns.dataKey as string)}</span>
          </Table.HeaderCell>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
