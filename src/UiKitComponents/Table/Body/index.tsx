import React, { useContext, useState } from 'react';

import { TableContext } from '../index';
import BodyRow from './BodyRow';

const BodyTable = () => {
  const { data, keyTable } = useContext(TableContext);

  const [selectedRows, setSelectedRow] = useState<any[]>([]);

  const handleSelectedRow = (item: any, checked: boolean) => {
    const items = checked
      ? [...selectedRows, item]
      : selectedRows.filter((currentItem) => currentItem !== item);

    setSelectedRow(items);
  };

  const clearSelectedRows = () => {
    setSelectedRow([]);
  };

  console.log(selectedRows);

  return (
    <tbody className="table-ui__body">
      {data.map((item, index) => {
        const stripedClassName = index % 2 === 0 ? 'parent-row-striped' : '';
        return (
          <BodyRow
            item={item}
            key={item[keyTable]}
            stripedClassName={stripedClassName}
            handleSelectedRow={handleSelectedRow}
            selectedRows={selectedRows}
            clearSelectedRows={clearSelectedRows}
          />
        );
      })}
    </tbody>
  );
};

export default BodyTable;
