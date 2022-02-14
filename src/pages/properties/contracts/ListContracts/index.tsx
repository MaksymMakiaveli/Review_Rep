import React, { useEffect, useState } from 'react';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { deleteContractById, getContractList } from '@Actions/contracts.action';
import { CustomTable } from '@UiKitComponents';
import { DataKeyType } from '@Types/application.types';
import { Contract } from '@Types/contract.types';

interface ListContractsProps {}

const dataKeyContractList: DataKeyType<Contract>[] = [
  {
    key: 'name',
    label: 'Contract name',
    align: 'left',
    flexGrow: 1,
    sortable: true,
  },
  {
    key: 'partnerId',
    label: 'Vendor',
    align: 'left',
    flexGrow: 1,
    sortable: true,
  },

  {
    key: 'price',
    label: 'Amount',
    align: 'left',
    flexGrow: 1,
    sortable: true,
  },
  {
    key: 'currencyName',
    label: 'Currency',
    align: 'left',
    flexGrow: 1,
  },
  {
    key: 'endDate',
    label: 'End date',
    align: 'left',
    flexGrow: 1,
    sortable: true,
  },
];

const getContractState = (state: RootState) => state.ContractReducer;

const ListContracts: React.FC<ListContractsProps> = () => {
  const dispatch = useDispatch();
  const { contracts, loadingContract } = useSelector(getContractState);
  const [checkedItemsList, setCheckedItemsList] = useState<number[] | string[]>([]);

  useEffect(() => {
    dispatch(getContractList());
  }, []);

  const updateContractsList = contracts.map((contract) => ({
    ...contract,
    endDate: contract.endDate.split('T')[0],
    startDate: contract.startDate.split('T')[0],
  }));

  const deleteContracts = () => {
    const contractsIds = {
      contractIds: checkedItemsList as number[],
    };
    dispatch(deleteContractById(contractsIds));
  };

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
        <TableHeaderActions
          checkedItemsList={checkedItemsList}
          pageCreatingUrl="newContract"
          textRedirectButton="New Contract"
          actionButtonDelete={deleteContracts}
        />
        <CustomTable
          data={updateContractsList}
          dataKey={dataKeyContractList}
          currentDataKey="contractId"
          setCheckedItemsList={setCheckedItemsList}
        />
      </div>
    </div>
  );
};

export default ListContracts;
