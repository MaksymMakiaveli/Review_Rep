import React, { memo } from 'react';
import { CustomCellProps } from '../Table.type';
import { Table } from 'rsuite';
import { useNavigate } from 'react-router-dom';

const { Cell } = Table;

function CustomCell(props: CustomCellProps) {
  const { dataKey, ...rest } = props;

  const navigate = useNavigate();

  const redirect = () => {
    navigate(`${rest.rowKey && rest.rowKey}`);
  };
  return (
    <Cell {...rest}>
      <span className="cell-value">{rest.rowData && rest.rowData[dataKey]}</span>
      <div onClick={redirect} role="click-area" className="click-area" />
    </Cell>
  );
}

export default memo(CustomCell);
