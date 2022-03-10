import React, { useEffect } from 'react';

import { getOneContract } from '@Actions/contracts.action';
import { Loader } from '@common';
import { useToggle } from '@hooks';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Edit from './Edit';
import Preview from './Preview';

type ContractParams = {
  ContractID: string;
};

interface ContractProps {}

const getContractState = (state: RootState) => state.ContractReducer;

const EditContract: React.FC<ContractProps> = () => {
  const params = useParams<ContractParams>();
  const dispatch = useDispatch();
  const [modeEdit, setModeEdit] = useToggle();
  const { currentContract, loadingContract } = useSelector(getContractState);
  const contractId = params.ContractID ? params.ContractID : '';

  useEffect(() => {
    dispatch(getOneContract(contractId));
  }, []);

  if (loadingContract || !currentContract) {
    return <Loader />;
  }

  const updateCurrentContract = {
    ...currentContract,
    endDate: currentContract.endDate.split('T')[0],
    startDate: currentContract.startDate.split('T')[0],
  };

  return (
    <div>
      <div className="padding_wrapper_page">
        {modeEdit ? (
          <Edit currentContract={updateCurrentContract} backToPreview={setModeEdit} />
        ) : (
          <Preview currentContract={updateCurrentContract} openEditPage={setModeEdit} />
        )}
      </div>
    </div>
  );
};

export default EditContract;
