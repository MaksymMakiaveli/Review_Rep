import React, { useContext } from 'react';
import { TableContext } from '../index';
import HeaderCell from './HeaderCell';

const TableHeader = () => {
  const { columnsConfig } = useContext(TableContext);

  return (
    <thead className="table-ui__header">
      <tr>
        <HeaderCell />
        {columnsConfig.map((column) => (
          <HeaderCell value={column.title} key={column.dataKey as string} />
        ))}
      </tr>
    </thead>
  );
};
export default React.memo(TableHeader);
