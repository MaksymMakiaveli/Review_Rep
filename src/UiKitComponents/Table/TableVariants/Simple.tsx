import React, { memo } from 'react';
import { ISimple } from '../Table.type';
import { Pagination, Table } from 'rsuite';
import { usePagination, useSortedTable } from '@hooks';
import CustomCell from '../TableComponents/CustomCell';
import { TableOptions } from '../options';

const MemoizedTable = memo(Table);
const MemoizedColumn = memo(Table.Column);
const MemoizedHeaderCell = memo(Table.HeaderCell);

function Simple<T>(props: ISimple<T>) {
  const { data, rowKey, columnsConfig } = props;

  const state = useSortedTable<T>(data);
  const { activePage, filteredData, totalPages, limit, changePage } = usePagination<T>(
    state.sortedData
  );

  return (
    <div className="table" role="table">
      <div className={'table-wrapper'}>
        <MemoizedTable
          {...TableOptions}
          data={filteredData}
          rowKey={rowKey}
          sortColumn={state.column}
          sortType={state.direction}
          onSortColumn={state.sortColumn}
          renderTreeToggle={(icon, rowData) => {
            if (rowData?.children && rowData.children.length === 0) {
              return null;
            }
            return icon;
          }}
        >
          {columnsConfig.map((column) => {
            const { headerTitle, dataKey, flexGrow, ...rest } = column;
            const size = flexGrow ? flexGrow : 1;
            return (
              <MemoizedColumn
                {...rest}
                key={dataKey}
                flexGrow={size}
                align={'left'}
                verticalAlign={'middle'}
              >
                <MemoizedHeaderCell>{headerTitle}</MemoizedHeaderCell>
                <CustomCell dataKey={dataKey} />
              </MemoizedColumn>
            );
          })}
        </MemoizedTable>
      </div>
      <div className="pagination-wrapper">
        <Pagination
          prev
          next
          ellipsis
          boundaryLinks
          layout={['pager']}
          total={totalPages}
          limit={limit}
          maxButtons={5}
          size="sm"
          activePage={activePage}
          onChangePage={changePage}
        />
      </div>
    </div>
  );
}

export default Simple;
