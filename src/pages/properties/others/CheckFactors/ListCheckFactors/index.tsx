import React, { useMemo } from 'react';
import { RootState } from '@RootStateType';
import { useSelector } from 'react-redux';
import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';

import { TCheckFactorTable } from '@Types/checkFactors.type';
import { TableSemantic } from '@UiKitComponents';
import { DataKeyType } from '@Types/application.types';

interface ListCheckFactorsProps {}

const columns: DataKeyType[] = [
  {
    key: 'checkFactorId',
    label: 'Check Factor ID',
  },
  {
    key: 'checkFactorCode',
    label: 'Check Factor Code',
  },
  {
    key: 'name',
    label: 'Check Factor Name',
  },
];

const getCheckFactorState = (state: RootState) => state.CheckFactorReducer;

const ListCheckFactors: React.FC<ListCheckFactorsProps> = () => {
  const { checkFactorList, loadingCheckFactor } = useSelector(getCheckFactorState);

  const memoizedData = useMemo((): TCheckFactorTable[] => {
    return checkFactorList.map((checkFactor) => ({
      name: checkFactor.name,
      checkFactorCode: checkFactor.checkFactorCode,
      checkFactorId: checkFactor.checkFactorId,
      isSelected: false,
    }));
  }, [checkFactorList]);
  const memoizedColumns = useMemo((): DataKeyType[] => columns, []);

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

      <TableSemantic data={memoizedData} columnsConfig={memoizedColumns} keyTable="checkFactorId" />
    </div>
  );
};

export default ListCheckFactors;
