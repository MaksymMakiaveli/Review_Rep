import React from 'react';

interface HeaderCellProps {
  value?: string | number;
}

const HeaderCell = (props: HeaderCellProps) => {
  const { value } = props;
  return <th className="header-cell">{value}</th>;
};
export default React.memo(HeaderCell);
