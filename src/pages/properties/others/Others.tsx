import React from 'react';

import { Routes, Route } from 'react-router-dom';

import CheckFactors from './CheckFactors';
import CostCenters from './CostCenters';
import ExitTypes from './ExitTypes';

const Others = () => {
  return (
    <>
      <Routes>
        <Route path="CheckFactors/*" element={<CheckFactors />} />
        <Route path="CostCenters/*" element={<CostCenters />} />
        <Route path="ExitTypes/*" element={<ExitTypes />} />
      </Routes>
    </>
  );
};

export default Others;
