import React from 'react';

import { DataKeyType } from '@Types/application.types';
import TableBodyRow from '../TableBodyRow';
import { Draggable } from 'react-beautiful-dnd';

interface TableBodyProps<T extends object> {
  readonly data: T[];
  readonly columnsConfig: DataKeyType[];
  readonly keyTable: string;
  readonly selectedKeys: number[];
  readonly handleCheckbox: (value?: number | string, checked?: boolean) => void;
}

const TableBody = <T extends object>(
  props: TableBodyProps<T>,
  ref: React.Ref<HTMLTableSectionElement> | null
) => {
  const { data, columnsConfig, keyTable, selectedKeys, handleCheckbox, ...rest } = props;

  return (
    <tbody className="table-ui__body" ref={ref} {...rest}>
      {data.map((item, index) => (
        <Draggable
          key={(item as any)[keyTable]}
          draggableId={`${(item as any)[keyTable]}`}
          index={index}
        >
          {({ innerRef, draggableProps, dragHandleProps }) => {
            return (
              <TableBodyRow
                ref={innerRef}
                {...draggableProps}
                {...dragHandleProps}
                key={(item as any)[keyTable]}
                item={item}
                columnsConfig={columnsConfig}
                keyTable={keyTable}
                selectedKeys={selectedKeys}
                handleCheckbox={handleCheckbox}
              />
            );
          }}
        </Draggable>
      ))}
    </tbody>
  );
};

export default React.forwardRef(TableBody);
