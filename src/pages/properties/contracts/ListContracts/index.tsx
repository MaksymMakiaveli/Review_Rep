import React, { useMemo } from 'react';

import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { RootState } from '@RootStateType';
import { ColumnsTable } from '@Types/application.types';
import { TContractTable } from '@Types/contract.types';
import { Table } from '@UiKitComponents';
import { useSelector } from 'react-redux';

const columnsContract: ColumnsTable<TContractTable>[] = [
  {
    dataKey: 'name',
    headerTitle: 'Contract name',
    sortable: true,
  },
  {
    dataKey: 'partnerId',
    headerTitle: 'Vendor',
    sortable: true,
  },

  {
    dataKey: 'price',
    headerTitle: 'Amount',
    sortable: true,
  },
  {
    dataKey: 'currencyName',
    headerTitle: 'Currency',
  },
  {
    dataKey: 'endDate',
    headerTitle: 'End date',
    sortable: true,
  },
];

const getContractState = (state: RootState) => state.ContractReducer;

const ListContracts = () => {
  const { contracts, loadingContract } = useSelector(getContractState);

  const memoizedData = useMemo(
    () =>
      contracts.map(
        (contract): TContractTable => ({
          contractId: contract.contractId,
          name: contract.name,
          price: contract.price,
          partnerId: contract.partnerId,
          endDate: contract.endDate.split('T').splice(0, 1).join(''),
          currencyName: contract.currencyName,
        })
      ),
    [contracts]
  );
  const memoizedColumns = useMemo(() => columnsContract, []);

  if (loadingContract) {
    return <Loader />;
  }
  if (!contracts.length) {
    return (
      <EmptyPage textButton="Contract" redirectPath="newContract">
        <h5>You don`t have contracts yet</h5>
        <h5>Click the button and create a new contract</h5>
      </EmptyPage>
    );
  }

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions pageCreatingUrl="newContract" textRedirectButton="New Contract" />
        <Table
          type={'simple'}
          data={memoizedData}
          columnsConfig={memoizedColumns}
          rowKey={'contractId'}
        />
      </div>
    </div>
  );
};

export default ListContracts;
