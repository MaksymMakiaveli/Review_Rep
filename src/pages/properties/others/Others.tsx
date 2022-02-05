import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CostCenters from './CostCenters';

const Others = () => {
  return (
    <>
      <Routes>
        <Route path="CheckFactors/*" />
        <Route path="CostCenters/*" element={<CostCenters />} />
        <Route path="ExitTypes/*" />
      </Routes>
    </>
  );
};

export default Others;
