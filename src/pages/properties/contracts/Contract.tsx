import React, { useEffect } from 'react';

import { getContractList } from '@Actions/contracts.action';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CreateContract from './CreateContract';
import EditContract from './EditContract';
import ListContracts from './ListContracts';

const getContractState = (state: RootState) => state.ContractReducer;

const Contract: React.FC = () => {
  const dispatch = useDispatch();
  const { contracts } = useSelector(getContractState);

  useEffect(() => {
    if (!contracts.length) {
      dispatch(getContractList());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<ListContracts />} />
        <Route path="newContract" element={<CreateContract />} />
        <Route path=":ContractID" element={<EditContract />} />
      </Routes>
    </>
  );
};

export default Contract;
