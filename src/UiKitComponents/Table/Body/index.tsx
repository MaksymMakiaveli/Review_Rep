import React, { RefObject, useContext, useState } from 'react';
import BodyRow from './BodyRow';
import { TableContext } from '../index';

const BodyTable = () => {
  const { data, keyTable } = useContext(TableContext);
  const [nodeListParentRow, setNodeListParentRow] = useState<RefObject<HTMLTableRowElement>[]>();
  console.log(nodeListParentRow);
  return (
    <tbody className="table-ui__body">
      {data.map((item) => (
        <BodyRow setNodeListParentRow={setNodeListParentRow} item={item} key={item[keyTable]} />
      ))}
    </tbody>
  );
};

export default BodyTable;
