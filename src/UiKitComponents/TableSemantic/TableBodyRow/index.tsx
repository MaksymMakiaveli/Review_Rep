import React from 'react';
import CheckboxCell from '../CheckboxCell';
import Cell from '../Cell';
import { DataKeyType } from '@Types/application.types';
// import { Table } from 'semantic-ui-react';
import cl from 'classnames';
//
// const MemoizedTableRow = React.memo(Table.Row);

interface TableBodyRowProps<T extends object> {
  readonly item: T;
  readonly columnsConfig: DataKeyType[];
  readonly keyTable: string;
  readonly selectedKeys: number[];
  readonly handleCheckbox: (value?: number | string, checked?: boolean) => void;
}

const TableBodyRow = <T extends object>(
  props: TableBodyRowProps<T>,
  ref: React.ForwardedRef<HTMLTableRowElement> | null
) => {
  const { item, columnsConfig, keyTable, selectedKeys, handleCheckbox, ...rest } = props;

  const isSelected = selectedKeys.some((keySelected) => keySelected === (item as any)[keyTable]);

  return (
    <tr className={cl({ 'selected-row': isSelected })} ref={ref} {...rest}>
      <CheckboxCell
        id={(item as any)[keyTable]}
        handleCheckbox={handleCheckbox}
        checked={isSelected}
      />
      {columnsConfig.map((columnItem) => (
        <Cell key={(item as any)[columnItem.key]} itemDataValue={(item as any)[columnItem.key]} />
      ))}
    </tr>
  );
};

export default React.forwardRef(TableBodyRow);
