import React from 'react';

import { Pagination as PaginationComponent, Table as TableComponent } from 'rsuite';
import CheckboxCell from './CheckboxCell';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { DataKeyType, DataType, MappedObjectType } from '@Types/application.types';
import { usePaginationTable, useSelectKeysTable } from '@hooks';

import './Table.scss';
import useDataForTable from '../../hooks/useDataForTable';

interface TableRSProps<T extends MappedObjectType<T>> {
  readonly data: DataType<T>[];
  readonly columns: DataKeyType<T>[];
  readonly tableKey: keyof T;
}

const Table = React.memo(TableComponent);
const Column = React.memo(TableComponent.Column);
const HeaderCell = React.memo(TableComponent.HeaderCell);
const Cell = React.memo(TableComponent.Cell);
const Pagination = React.memo(PaginationComponent);

function TableRS<T>(props: TableRSProps<T>) {
  const { data, columns, tableKey } = props;

  const settingPagination = usePaginationTable(data.length);
  const [selectKey, handleCheckbox] = useSelectKeysTable();
  const [newData, optionSort, handleSort] = useDataForTable(data);

  const filteredData = newData.filter((v, i) => {
    const start = settingPagination.limit * (settingPagination.activePage - 1);
    const end = start + settingPagination.limit;

    return i >= start && i < end;
  });

  const onDragEnd = (result: any) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>
        <Droppable droppableId={tableKey as string}>
          {({ innerRef, droppableProps, placeholder }) => {
            return (
              <div ref={innerRef} {...droppableProps}>
                <Table
                  rowHeight={48}
                  height={620}
                  sortColumn={optionSort.sortColumn}
                  sortType={optionSort.sortType}
                  onSortColumn={handleSort}
                  data={filteredData}
                >
                  <Column width={50} align="center">
                    <HeaderCell>
                      <div> </div>
                    </HeaderCell>
                    <CheckboxCell
                      dataKey={tableKey as string}
                      onChange={handleCheckbox}
                      selectStateTable={selectKey}
                    />
                  </Column>
                  {columns.map((column) => {
                    const { label, key, align, flexGrow, ...rest } = column;
                    return (
                      <Column
                        {...rest}
                        align={align ? align : 'left'}
                        flexGrow={flexGrow ? flexGrow : 1}
                        key={key as string}
                        verticalAlign="middle"
                      >
                        <HeaderCell>{label}</HeaderCell>
                        <Cell dataKey={key as string} />
                      </Column>
                    );
                  })}
                </Table>
                {placeholder}
              </div>
            );
          }}
        </Droppable>
        <div className="pagination_wrapper">
          <Pagination {...settingPagination} />
        </div>
      </>
    </DragDropContext>
  );
}

export default TableRS;
