import React from 'react';
import { Table } from 'rsuite';
import { CellProps } from 'rsuite/esm/Table/Table';
import { CustomCheckbox } from '@UiKitComponents';
import { CheckboxProps } from 'rsuite/esm/Checkbox/Checkbox';

interface CheckboxCellProps
  extends Omit<CellProps, 'dataKey'>,
    Required<Pick<CheckboxProps, 'onChange'>> {
  selectStateTable: number[];
  dataKey: string;
}

const Cell = React.memo(Table.Cell);

const CheckboxCell = (props: CheckboxCellProps) => {
  const { rowData, dataKey, selectStateTable, onChange, ...rest } = props;

  const selectKeys = selectStateTable.some((key) => key === rowData[dataKey]);

  return (
    <>
      <Cell
        {...rest}
        style={{
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <CustomCheckbox
            style={{ margin: '0 auto' }}
            checked={selectKeys}
            value={rowData[dataKey]}
            onChange={onChange}
            inline
          />
        </div>
      </Cell>
    </>
  );
};

export default React.memo(CheckboxCell);
