import React, { useRef } from 'react';
import { IDraggable } from '../Table.type';
import { useDrop } from 'react-dnd';
import { Pagination, Table } from 'rsuite';
import { CheckCell, DragLayerRow, Row } from '../TableComponents';
import { usePagination, useSelectRow, useSortedTable } from '@hooks';
import { DnDOptions } from '../DnDOptions';
import cl from 'classnames';
import CustomCell from '../TableComponents/CustomCell';

const { Column, HeaderCell } = Table;

function Draggable<T>(props: IDraggable<T>) {
  const { data, rowKey, columnsConfig, isDraggable, dropAction } = props;

  const tableRef = useRef(null);
  const state = useSortedTable(data);
  const { activePage, filteredData, totalPages, changePage } = usePagination(state.sortedData);
  const { handlingSelectRow, selectedRows } = useSelectRow({ rowKey });

  const onDropRow = (value: any) => {
    console.log(value);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DnDOptions.ROW,
    drop: (draggingItems) => {
      const dropObject = {
        area: DnDOptions.area.body,
        drag: draggingItems,
        drop: null,
      };

      onDropRow(dropObject);
    },
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

export default Draggable;
