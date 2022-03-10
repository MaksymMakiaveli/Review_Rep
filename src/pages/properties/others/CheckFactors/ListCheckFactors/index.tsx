import React, { useMemo } from 'react';

import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { RootState } from '@RootStateType';
import { ColumnsTable } from '@Types/application.types';
import { TCheckFactorTable } from '@Types/checkFactors.type';
import { Table } from '@UiKitComponents';
import { useSelector } from 'react-redux';

const columns: ColumnsTable<TCheckFactorTable>[] = [
  {
    dataKey: 'checkFactorId',
    title: 'Check Factor ID',
    isSorted: true,
  },
  {
    dataKey: 'name',
    title: 'Check Factor Name',
    isSorted: true,
  },
];

const getCheckFactorState = (state: RootState) => state.CheckFactorReducer;

const ListCheckFactors = () => {
  const { checkFactorList, loadingCheckFactor } = useSelector(getCheckFactorState);

  const memoizedData = useMemo(() => {
    return checkFactorList.map((checkFactor): TCheckFactorTable => {
      const newCheckFactor = {
        name: checkFactor.name,
        checkFactorCode: checkFactor.checkFactorCode,
        checkFactorId: checkFactor.checkFactorId,
        children: null,
      };
      return {
        ...newCheckFactor,
      };
    });
  }, [checkFactorList]);
  const memoizedColumns = useMemo(() => columns, []);

  if (loadingCheckFactor) {
    return <Loader />;
  }
  if (!checkFactorList.length) {
    return (
      <EmptyPage textButton="Check Factor" redirectPath="CreateCheckFactor">
        <h5>You don`t have any check factor yet.</h5>
        <h5>Click the button and add a new check factor</h5>
      </EmptyPage>
    );
  }

  return (
    <div className="padding_wrapper_table-page">
      <TableHeaderActions
        pageCreatingUrl="CreateCheckFactor"
        textRedirectButton="New Check Factor"
      />

      <Table
        data={memoizedData}
        columnsConfig={memoizedColumns}
        keyTable="checkFactorId"
        isDraggable
      />
    </div>
  );
};

export default ListCheckFactors;
