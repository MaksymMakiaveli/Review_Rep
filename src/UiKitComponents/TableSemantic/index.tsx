import React from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { DataKeyType } from '@Types/application.types';

import { usePagination, useSelectKeysTable } from '@hooks';

import './TableSemantic.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

interface TableSemanticProps<T extends object, Keys extends keyof T> {
  readonly data: T[];
  readonly columnsConfig: DataKeyType[];
  readonly keyTable: Keys;
}

const TableSemantic = <T extends object, Keys extends keyof T>(
  props: TableSemanticProps<T, Keys>
) => {
  const { data, columnsConfig, keyTable } = props;

  const [selectedKeys, handleCheckbox] = useSelectKeysTable();
  const { filteredData, totalPages, changePage } = usePagination({ data });

  const onDragEnd = (result: any) => {
    console.log(result);
  };
  const onDragStart = (result: any) => {
    console.log(result);
  };

  return (
    <div className="table-wrapper">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Table className="table-ui" basic="very">
          <TableHeader columnsConfig={columnsConfig} />
          <Droppable droppableId={keyTable as string} isCombineEnabled>
            {(provided) => {
              return (
                <>
                  <TableBody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    selectedKeys={selectedKeys}
                    data={filteredData}
                    columnsConfig={columnsConfig}
                    keyTable={keyTable as string}
                    handleCheckbox={handleCheckbox}
                  />
                  {provided.placeholder}
                </>
              );
            }}
          </Droppable>
        </Table>
      </DragDropContext>
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
    </div>
  );
};

export default TableSemantic;
