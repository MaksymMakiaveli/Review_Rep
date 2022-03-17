import React from 'react';
import { IDraggable } from '../Table.type';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Table } from 'rsuite';
import { Row } from '../TableComponents';

function Draggable<T>(props: IDraggable<T>) {
  const { data, rowKey, columnsConfig } = props;
  const onDropRow = (value: any) => {
    console.log(value);
  };

  return (
    <div className="table-wrapper" role="table-wrapper">
      <DndProvider backend={HTML5Backend}>
        <Table
          height={650}
          data={data}
          hover={false}
          rowKey={rowKey}
          rowClassName={`row`}
          renderRow={(children, rowData) => {
            return rowData ? (
              <Row rowData={rowData} onDropRow={onDropRow} dataKey={rowKey}>
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
              <Table.Column {...rest} key={dataKey}>
                <Table.HeaderCell>{headerTitle}</Table.HeaderCell>
                <Table.Cell dataKey={dataKey} />
              </Table.Column>
            );
          })}
        </Table>
      </DndProvider>
    </div>
  );
}

export default Draggable;
