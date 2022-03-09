import React, { useReducer } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Pagination, Table as TableSemantic } from 'semantic-ui-react';

import BodyTable from './Body';
import Header from './Header';

import './Table.scss';
import { usePagination } from '@hooks';

import { tableReducer } from './table.reducer';
import { TableCreateContext, TableProps } from './TableTypes.type';
import DragLayerRow from './Body/DragLayerRow';

export const TableContext = React.createContext<TableCreateContext>(undefined!);

function Table<T extends object>(props: TableProps<T>) {
  const { data, columnsConfig, keyTable, isDraggable = false, actionForDrag } = props;

  const [state, dispatch] = useReducer(tableReducer, {
    data,
    column: null,
    direction: undefined,
  });

  const { filteredData, totalPages, changePage } = usePagination(state.data);

  const sortedColumn = (columnName: typeof state.column) => {
    return () => {
      if (columnName) {
        dispatch({ type: 'CHANGE_SORT', payload: columnName });
      } else {
        throw new Error();
      }
    };
  };

  const StateContext = {
    data: filteredData,
    columnsConfig,
    keyTable,
    isDraggable,
    actionForDrag,
  };
  return (
    <div className="table-wrapper">
      <TableContext.Provider value={StateContext}>
        <DndProvider backend={HTML5Backend}>
          <DragLayerRow />
          <TableSemantic className="table-ui" basic="very">
            <Header column={state.column} direction={state.direction} sortedColumn={sortedColumn} />
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
