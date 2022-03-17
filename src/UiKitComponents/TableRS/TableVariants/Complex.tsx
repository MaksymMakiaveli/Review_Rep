import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Pagination, Table } from 'rsuite';
import { CheckCell, DragLayerRow, Row } from '../TableComponents';
import { IComplex } from '../Table.type';
import CustomCell from '../TableComponents/CustomCell';
import { usePagination, useSortedTable } from '@hooks';
import { DnDOptions } from '../DnDOptions';
import cl from 'classnames';
import useSelectRow from '../../../hooks/useSelectRow';

const { Column, HeaderCell } = Table;

function Complex<T>(props: IComplex<T>) {
  const { data, rowKey, columnsConfig, isTree, isDraggable } = props;

  const tableRef = useRef(null);
  const state = useSortedTable(data);
  const { activePage, filteredData, totalPages, changePage } = usePagination(state.sortedData);
  const { handlingSelectRow, clearSelectedRows, selectedRows } = useSelectRow({ rowKey });

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
      clearSelectedRows();
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
          isTree={isTree}
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
          renderRowExpanded={(rowData) => {
            console.log(rowData);
            return null as React.ReactNode;
          }}
          renderRow={(children, rowData) => {
            return rowData ? (
              <Row
                rowData={rowData}
                onDropRow={onDropRow}
                dataKey={rowKey}
                selectedRows={selectedRows}
                handlingSelectedRows={handlingSelectRow}
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

export default Complex;
