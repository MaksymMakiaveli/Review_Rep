import React from 'react';
import { Column, useTable } from 'react-table';
import './ReactTable.scss';

interface ReactTableProps<T extends object = {}> {
  columns: Column<T>[];
  data: T[];
}

const ReactTable = (props: ReactTableProps) => {
  const { columns, data } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <>
      <table {...getTableProps()} className="react-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render('Header')} </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ReactTable;
