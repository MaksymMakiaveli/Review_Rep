import React, { useState } from 'react';
import { DataKeyType } from '@Types/application.types';
import { CheckFactors } from '@Types/checkFactors.type';
import { RootState } from '@RootStateType';
import { useSelector } from 'react-redux';
import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { CustomTable } from '@UiKitComponents';

interface ListCheckFactorsProps {}

const dataKeyCheckFactorsList: DataKeyType<CheckFactors>[] = [
  {
    key: 'name',
    label: 'check out reason',
    align: 'left',
    flexGrow: 1,
  },
  {
    key: 'checkFactorCode',
    label: 'check out code',
    align: 'left',
    flexGrow: 1,
  },
];
const getCheckFactorState = (state: RootState) => state.CheckFactorReducer;

const ListCheckFactors: React.FC<ListCheckFactorsProps> = () => {
  const { checkFactorList, loadingCheckFactor } = useSelector(getCheckFactorState);
  const [checkedItemsList, setCheckedItemsList] = useState<number[] | string[]>([]);

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
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions
          checkedItemsList={checkedItemsList}
          pageCreatingUrl="CreateCheckFactor"
          textRedirectButton="New Check Factor"
        />
        <CustomTable
          data={checkFactorList}
          dataKey={dataKeyCheckFactorsList}
          currentDataKey="checkFactorId"
          setCheckedItemsList={setCheckedItemsList}
        />
      </div>
    </div>
  );
};

export default ListCheckFactors;
