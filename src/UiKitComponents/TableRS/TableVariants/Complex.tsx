import React, { useCallback, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Pagination, Table } from 'rsuite';
import { CheckCell, DragLayerRow, Row } from '../TableComponents';
import { IComplex } from '../Table.type';
import { tableReducer } from '../Table.reducer';
import CustomCell from '../TableComponents/CustomCell';
import { usePagination } from '@hooks';

const { Column, HeaderCell } = Table;

function Complex<T>(props: IComplex<T>) {
  const { data, rowKey, columnsConfig, isTree, isDraggable } = props;

  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const [state, dispatch] = useReducer(tableReducer, {
    data,
    column: '',
    direction: undefined,
  });

  const { activePage, filteredData, totalPages, changePage } = usePagination(state.data);

  const handlingSelectedRows = (item: T, checked: boolean) => {
    console.log(checked);
    const items = checked
      ? [...selectedRows, item]
      : selectedRows.filter((selectedItem) => selectedItem[rowKey] !== item[rowKey]);
    setSelectedRows(items);
  };

  const sortedColumn = (dataKey: string, sortType: 'desc' | 'asc' | undefined) => {
    const payload = {
      direction: sortType,
      column: dataKey,
    };
    dispatch({ type: 'CHANGE_SORT', payload });
  };

  const clearSelectedRows = useCallback(() => {
    setSelectedRows([]);
  }, []);

  // console.log(selectedRows);

  const onDropRow = (value: any) => {
    console.log(value);
  };

  return (
    <div className="table-wrapper" role="table-wrapper">
      <DndProvider backend={HTML5Backend}>
        <DragLayerRow />
        <Table
          height={650}
          data={filteredData}
          rowKey={rowKey}
          isTree={isTree}
          hover={false}
          sortColumn={state.column}
          sortType={state.direction}
          onSortColumn={sortedColumn}
          rowClassName={`row`}
          renderTreeToggle={(icon, rowData) => {
            if (rowData?.children && rowData.children.length === 0) {
              return null;
            }
            return icon;
          }}
          renderRow={(children, rowData) => {
            return rowData ? (
              <Row
                rowData={rowData}
                onDropRow={onDropRow}
                dataKey={rowKey}
                selectedRows={selectedRows}
                handlingSelectedRows={handlingSelectedRows}
                clearSelectedRows={clearSelectedRows}
                isDraggable={isDraggable}
              >
                {children}
              </Row>
            ) : (
              children
            );
          }}
        >
          {columnsConfig.map((column) => {
            const { headerTitle, dataKey, ...rest } = column;
            return (
              <Column {...rest} key={dataKey} align={'left'} verticalAlign={'middle'}>
                <HeaderCell>{headerTitle}</HeaderCell>
                <CustomCell dataKey={dataKey} />
              </Column>
            );
          })}
          <Column width={10}>
            <HeaderCell>
              <div> </div>
            </HeaderCell>
            <CheckCell
              selectedRows={selectedRows}
              dataKey={rowKey}
              onChange={handlingSelectedRows}
            />
          </Column>
        </Table>
      </DndProvider>
      <div className="pagination-wrapper">
        <Pagination
          prev
          next
          size={'sm'}
          layout={['pager']}
          total={totalPages}
          maxButtons={5}
          activePage={activePage}
          onChangePage={changePage}
        />
      </div>
    </div>
  );
}

export default Complex;
