import React, { useMemo } from 'react';

import { Loader } from '@common';
import { RootState } from '@RootStateType';
import { EmptyPage, TableHeaderActions } from '@TypeComponents/index';
import { ColumnsTable } from '@Types/application.types';
import { TCostCenterTable } from '@Types/costCenters.type';
import { Table } from '@UiKitComponents';
import { useSelector } from 'react-redux';

interface ListConstCentersProps {}

const columnsCostCenter: ColumnsTable<TCostCenterTable>[] = [
  {
    dataKey: 'costCenterCode',
    title: 'Cost Center Code',
  },
  {
    dataKey: 'name',
    title: 'Cost Center Name',
    isSorted: true,
  },
];

const getCostCenterState = (state: RootState) => state.CostCenterReducer;

const ListConstCenters: React.FC<ListConstCentersProps> = () => {
  const { costCentersList, loadingCostCenter } = useSelector(getCostCenterState);

  const memoizedData = useMemo(
    () =>
      costCentersList.map(
        (costCenter): TCostCenterTable => ({
          costCenterCode: costCenter.costCenterCode,
          costCenterId: costCenter.costCenterId,
          name: costCenter.name,
        })
      ),
    [costCentersList]
  );

  const memoizedColumns = useMemo(() => columnsCostCenter, []);

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
          pageCreatingUrl="CreateCostCenter"
          textRedirectButton="New Cost Center"
        />
        <Table data={memoizedData} columnsConfig={memoizedColumns} keyTable="costCenterId" />
      </div>
    </div>
  );
};

export default ListConstCenters;
