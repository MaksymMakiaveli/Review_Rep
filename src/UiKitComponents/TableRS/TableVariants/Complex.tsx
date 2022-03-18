import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Pagination, Table } from 'rsuite';
import { CheckCell, DragLayerRow, Row } from '../TableComponents';
import { IComplex } from '../Table.type';
import CustomCell from '../TableComponents/CustomCell';
import { usePagination, useSelectRow, useSortedTable } from '@hooks';
import { DnDOptions } from '../DnDOptions';
import { genericMemo } from '@helpers/functions';

const { Column, HeaderCell } = Table;

function Complex<T>(props: IComplex<T>) {
  const { data, rowKey, columnsConfig, isTree, isDraggable, dropAction } = props;

  const tableRef = useRef(null);
  const { sortedData, sortColumn, column, direction } = useSortedTable(data);
  const { activePage, filteredData, changePage, totalPages, limit } = usePagination(sortedData);
  const { handlingSelectRow, selectedRows } = useSelectRow({ rowKey });

  const [, drop] = useDrop({
    accept: DnDOptions.ROW,
    drop: (draggingItems) => ({ area: DnDOptions.area.body, drag: draggingItems, drop: 0 }),
    canDrop: (item, monitor) => {
      return monitor.isOver({ shallow: true });
    },
  });

  drop(tableRef);
  return (
    <div ref={tableRef} className="table" role="table">
      <div className={'table-wrapper'}>
        <DragLayerRow />
        <Table
          height={600}
          rowHeight={50}
          data={filteredData}
          rowKey={rowKey}
          isTree={isTree}
          hover={false}
          sortColumn={column}
          sortType={direction}
          onSortColumn={sortColumn}
          rowClassName="row"
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
                dataKey={rowKey}
                selectedRows={selectedRows}
                handlingSelectedRows={handlingSelectRow}
                isDraggable={isDraggable}
                dropAction={dropAction}
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
            <CheckCell selectedRows={selectedRows} dataKey={rowKey} onChange={handlingSelectRow} />
          </Column>
        </Table>
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

export default genericMemo(Complex);
