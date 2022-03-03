import React from 'react';

import { Routes, Route } from 'react-router-dom';

import CheckFactors from './CheckFactors';
import CostCenters from './CostCenters';

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
