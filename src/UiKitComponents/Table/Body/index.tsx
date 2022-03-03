import React, { useContext } from 'react';

import { TableContext } from '../index';
import BodyRow from './BodyRow';

const BodyTable = () => {
  const { data, keyTable } = useContext(TableContext);

  return (
    <tbody className="table-ui__body">
      {data.map((item, index) => {
        const stripedClassName = index % 2 === 0 ? 'parent-row-striped' : '';

        return <BodyRow item={item} key={item[keyTable]} stripedClassName={stripedClassName} />;
      })}
    </tbody>
  );
};

export default BodyTable;
