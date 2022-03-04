import React, { useContext, useState } from 'react';

import { TableContext } from '../index';
import BodyRow from './BodyRow';

const BodyTable = () => {
  const { data, keyTable } = useContext(TableContext);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectedRows = (id: number, checked: boolean) => {
    const keys = checked ? [...selectedRows, id] : selectedRows.filter((idRow) => idRow !== id);
    setSelectedRows(keys);
  };

  return (
    <tbody className="table-ui__body">
      {data.map((item, index) => {
        const stripedClassName = index % 2 === 0 ? 'parent-row-striped' : '';

        return (
          <BodyRow
            item={item}
            key={item[keyTable]}
            stripedClassName={stripedClassName}
            selectedRows={selectedRows}
            handleSelectedRows={handleSelectedRows}
          />
        );
      })}
    </tbody>
  );
};

export default BodyTable;
