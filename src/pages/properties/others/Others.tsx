import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CostCenters from './CostCenters';
import CheckFactors from './CheckFactors';

const Others = () => {
  return (
    <>
      <Routes>
        <Route path="CheckFactors/*" element={<CheckFactors />} />
        <Route path="CostCenters/*" element={<CostCenters />} />
        <Route path="ExitTypes/*" />
      </Routes>
    </>
  );
};

export default Others;
