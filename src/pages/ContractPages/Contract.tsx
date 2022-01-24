import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListContracts from '@pages/ContractPages/ListContracts';
import CreateContract from '@pages/ContractPages/CreateContract';
import EditContract from "@pages/ContractPages/EditContract";

const Contract: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<ListContracts />} />
        <Route path="newContract" element={<CreateContract />} />
        <Route path=":ContractID" element={<EditContract/>}/>
      </Routes>
    </>
  );
};

export default Contract;
