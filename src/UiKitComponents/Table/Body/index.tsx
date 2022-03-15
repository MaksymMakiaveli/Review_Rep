import React, { useContext, useState } from 'react';

import { TableContext } from '../index';
import BodyRow from './BodyRow';

import cl from 'classnames';

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
  //
  // const [{ isOver }, drop] = useDrop({
  //   accept: 'table-row',
  //   options: {
  //     name: 'BODYYYY',
  //   },
  //   drop: (draggingItem) => {
  //     clearSelectedRows();
  //     return {
  //       draggingItem,
  //       area: 'BODY',
  //     };
  //   },
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
  // });
  //
  // const bodyIsOver = isOver ? 'body-isOver' : '';
  //

  return (
    <tbody className={cl('table-ui__body')}>
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
