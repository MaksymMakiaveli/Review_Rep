import React, { useMemo } from 'react';
import { RootState } from '@RootStateType';
import { useSelector } from 'react-redux';
import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { Table } from '@UiKitComponents';
import { ColumnsTable } from '@Types/application.types';
import { TContractTable } from '@Types/contract.types';

const columnsContract: ColumnsTable<TContractTable>[] = [
  {
    dataKey: 'name',
    title: 'Contract name',
    isSorted: true,
  },
  {
    dataKey: 'partnerId',
    title: 'Vendor',
    isSorted: true,
  },

  {
    dataKey: 'price',
    title: 'Amount',
    isSorted: true,
  },
  {
    dataKey: 'currencyName',
    title: 'Currency',
  },
  {
    dataKey: 'endDate',
    title: 'End date',
    isSorted: true,
  },
];

const getContractState = (state: RootState) => state.ContractReducer;

const ListContracts = () => {
  const { contracts, loadingContract } = useSelector(getContractState);

  const memoizedData = useMemo(
    (): TContractTable[] =>
      contracts.map((contract) => ({
        contractId: contract.contractId,
        name: contract.name,
        price: contract.price,
        partnerId: contract.partnerId,
        endDate: contract.endDate.split('T').splice(0, 1).join(''),
        currencyName: contract.currencyName,
      })),
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
        <Table data={memoizedData} columnsConfig={memoizedColumns} keyTable="contractId" />
      </div>
    </div>
  );
};

export default ListContracts;
