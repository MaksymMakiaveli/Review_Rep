import React, { useReducer } from 'react';
import { ColumnsTable, ObjectKeysString } from '@Types/application.types';
import { Pagination, Table as TableSemantic } from 'semantic-ui-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './Header';
import BodyTable from './Body';
import './Table.scss';
import { usePagination } from '@hooks';
import { tableReducer } from './table.reducer';

interface TableProps<T = ObjectKeysString> {
  data: T[];
  columnsConfig: ColumnsTable<T>[];
  keyTable: keyof T;
  isDraggable?: boolean;
}

interface TableContextType<T = ObjectKeysString> extends TableProps<T> {}

export const TableContext = React.createContext<TableContextType>(undefined!);

function Table<T = ObjectKeysString>(props: TableProps<T>) {
  const { data, columnsConfig, keyTable, isDraggable = false } = props;

  const [{ sortedData, direction, column }, dispatch] = useReducer(tableReducer, {
    sortedData: data,
    column: null,
    direction: undefined,
  });

  const { filteredData, totalPages, changePage } = usePagination(sortedData);

  const sortedColumn = (columnName: typeof column) => {
    return () => {
      if (columnName) {
        dispatch({ type: 'CHANGE_SORT', payload: columnName });
      } else {
        throw new Error();
      }
    };
  };

  const StateContext: TableContextType<any> = {
    data: filteredData,
    columnsConfig,
    keyTable,
    isDraggable,
  };
  return (
    <div className="table-wrapper">
      <TableContext.Provider value={StateContext}>
        <DndProvider backend={HTML5Backend}>
          <TableSemantic className="table-ui" basic="very">
            <Header column={column} direction={direction} sortedColumn={sortedColumn} />
            <BodyTable />
          </TableSemantic>
        </DndProvider>
        <div className="pagination-wrapper">
          <Pagination
            lastItem={null}
            firstItem={null}
            totalPages={totalPages}
            secondary
            siblingRange={1}
            boundaryRange={0}
            ellipsisItem={null}
            onPageChange={changePage}
          />
        </div>
      </TableContext.Provider>
    </div>
  );
}

export default Table;
