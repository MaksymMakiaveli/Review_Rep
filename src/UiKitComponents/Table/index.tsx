import React, { useState } from 'react';
import { Table as TableSemantic } from 'semantic-ui-react';
import { ColumnsTable, DataTableType } from '@Types/application.types';
import TableHeader from './TableHeader';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './Table.scss';
import TableBody from './TableBody';

interface TableProps<Object extends DataTableType = any> {
  data: Object[];
  columnsConfig: ColumnsTable<Object>[];
  keyTable: keyof Object;
}
export type TableContextType<Object extends DataTableType> = TableProps<Object>;

const PureTable = React.memo(TableSemantic);

export const TableContext = React.createContext<TableContextType<any>>({} as TableContextType<any>);

const Table = <Object extends object>(props: TableProps<Object>) => {
  const { data, columnsConfig, keyTable } = props;
  const [valueContext] = useState({
    data,
    columnsConfig,
    keyTable,
  });

  const handleDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <div className="table-wrapper">
      <TableContext.Provider value={valueContext}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <PureTable className="table-ui" basic="very">
            <TableHeader />
            <TableBody />
          </PureTable>
        </DragDropContext>
      </TableContext.Provider>
    </div>
  );
};
export default Table;
