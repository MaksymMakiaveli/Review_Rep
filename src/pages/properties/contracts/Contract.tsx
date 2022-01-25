import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListContracts from './ListContracts';
import CreateContract from './CreateContract';
import EditContract from './EditContract';

const Contract: React.FC = () => {
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
