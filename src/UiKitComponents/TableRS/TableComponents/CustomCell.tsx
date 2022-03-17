import React from 'react';
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
      <span onClick={redirect} className="cell-value">
        {rest.rowData && rest.rowData[dataKey]}
      </span>
    </Cell>
  );
}

export default CustomCell;
