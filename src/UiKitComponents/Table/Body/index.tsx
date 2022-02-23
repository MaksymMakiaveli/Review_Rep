import React, { useContext } from 'react';
import BodyRow from './BodyRow';
import { TableContext } from '../index';

const BodyTable = () => {
  const { data, keyTable } = useContext(TableContext);
  
  return (
    <tbody className="table-ui__body">
      {data.map((item) => (
        <BodyRow item={item} key={item[keyTable]} />
      ))}
    </tbody>
  );
};

export default BodyTable;
