import React from 'react';
import { ISimple } from '../Table.type';
import { Table } from 'rsuite';

function Simple<T>(props: ISimple<T>) {
  const { data, rowKey, columnsConfig } = props;

  return (
    <div className="table-wrapper" role="table-wrapper">
      <Table hover={false} height={600} data={data} rowKey={rowKey} rowClassName={`row`}>
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
    </div>
  );
}

export default Simple;
