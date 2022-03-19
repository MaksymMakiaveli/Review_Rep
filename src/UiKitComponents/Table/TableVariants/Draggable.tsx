import React, { memo, useRef } from 'react';
import { IDraggable } from '../Table.type';
import { useDrop } from 'react-dnd';
import { Pagination, Table } from 'rsuite';
import { CheckCell, DragLayerRow, Row } from '../TableComponents';
import { usePagination, useSelectRow, useSortedTable } from '@hooks';
import { DndOptions, TableOptions } from '../options';
import cl from 'classnames';
import CustomCell from '../TableComponents/CustomCell';

const MemoizedTable = memo(Table);
const MemoizedColumn = memo(Table.Column);
const MemoizedHeaderCell = memo(Table.HeaderCell);

function Draggable<T>(props: IDraggable<T>) {
  const { data, rowKey, columnsConfig, dropAction } = props;

  const tableRef = useRef(null);
  const state = useSortedTable(data);
  const { activePage, filteredData, totalPages, limit, changePage } = usePagination(
    state.sortedData
  );
  const { handlingSelectRow, selectedRows } = useSelectRow({ rowKey });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DndOptions.ROW,
    drop: (draggingItems) => ({ area: DndOptions.area.body, drag: draggingItems, drop: 0 }),
    canDrop: (item, monitor) => {
      return monitor.isOver({ shallow: true });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActiveArea = canDrop && isOver;

  drop(tableRef);
  return (
    <div ref={tableRef} className="table" role="table">
      <div className={cl('table-wrapper', { ['table-wrapper-active']: isActiveArea })}>
        <DragLayerRow />
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
          renderRow={(children, rowData) => {
            return rowData ? (
              <Row
                rowData={rowData}
                dataKey={rowKey}
                selectedRows={selectedRows}
                handlingSelectedRows={handlingSelectRow}
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
          <MemoizedColumn width={10}>
            <MemoizedHeaderCell>
              <div> </div>
            </MemoizedHeaderCell>
            <CheckCell selectedRows={selectedRows} dataKey={rowKey} onChange={handlingSelectRow} />
          </MemoizedColumn>
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

export default Draggable;
