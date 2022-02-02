import React, { useEffect, useState } from 'react';
import { DataKeyType } from '@Types/application.types';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { getCostCentersList } from '@Actions/costCenter.action';
import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@TypeComponents/index';
import { CustomTable } from '@UiKitComponents';

interface ListConstCentersProps {}

const dataKeyCostCenterList: DataKeyType[] = [
  {
    key: 'costCenterCode',
    label: 'Cost Center Code',
    align: 'left',
    flexGrow: 1,
  },
  {
    key: 'name',
    label: 'Cost Center Name',
    align: 'left',
    flexGrow: 1,
    sortable: true,
  },
];

const getCostCenterState = (state: RootState) => state.CostCenterReducer;

const ListConstCenters: React.FC<ListConstCentersProps> = () => {
  const dispatch = useDispatch();
  const { costCentersList, loadingCostCenter } = useSelector(getCostCenterState);
  const [checkedItemsList, setCheckedItemsList] = useState<number[] | string[]>([]);

  useEffect(() => {
    dispatch(getCostCentersList());
  }, []);

  if (loadingCostCenter) {
    return <Loader />;
  }

  if (!costCentersList.length) {
    return (
      <EmptyPage textButton="Cost Center" redirectPath="CreateCostCenter">
        <h5>You don`t have any cost center yet.</h5>
        <h5>Click the button and add a new cost center</h5>
      </EmptyPage>
    );
  }

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions
          checkedItemsList={checkedItemsList}
          pageCreatingUrl="CreateCostCenter"
          textRedirectButton="Cost Center"
        />
        <CustomTable
          data={costCentersList}
          dataKey={dataKeyCostCenterList}
          currentDataKey="costCenterId"
          setCheckedItemsList={setCheckedItemsList}
        />
      </div>
    </div>
  );
};

export default ListConstCenters;
