import React, { useMemo } from 'react';
import { Table } from 'rsuite';
import { CustomCheckbox } from '@UiKitComponents';
import { CheckCellProps } from '../Table.type';

const { Cell } = Table;

function CheckCell(props: CheckCellProps) {
  const { onChange, dataKey, selectedRows, ...rest } = props;

  const isChecked = useMemo(
    () => selectedRows.some((row) => row[dataKey] === (rest as any).rowData[dataKey]),
    [selectedRows]
  );

  return (
    <Cell {...rest}>
      <div className="wrapper-checkbox">
        <CustomCheckbox value={rest.rowData as any} onChange={onChange} checked={isChecked} />
      </div>
    </Cell>
  );
}

export default CheckCell;
