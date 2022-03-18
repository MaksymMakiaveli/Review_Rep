import React from 'react';
import { ISimple } from '../Table.type';
import { Pagination, Table } from 'rsuite';
import { usePagination, useSortedTable } from '@hooks';
import CustomCell from '../TableComponents/CustomCell';

const { Column, HeaderCell } = Table;

function Simple<T>(props: ISimple<T>) {
  const { data, rowKey, columnsConfig } = props;

  const state = useSortedTable<T>(data);
  const { activePage, filteredData, totalPages, changePage } = usePagination<T>(state.sortedData);

  return (
    <div className="table" role="table">
      <div className={'table-wrapper'}>
        <Table
          height={600}
          data={filteredData}
          rowKey={rowKey}
          hover={false}
          sortColumn={state.column}
          sortType={state.direction}
          onSortColumn={state.sortColumn}
          rowClassName="row"
          renderTreeToggle={(icon, rowData) => {
            if (rowData?.children && rowData.children.length === 0) {
              return null;
            }
            return icon;
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
        </Table>
      </div>
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

export default Simple;
