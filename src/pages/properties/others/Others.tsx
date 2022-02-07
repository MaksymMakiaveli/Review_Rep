import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListConstCenters from './costcenters/ListCostCenters';
import CreateCostCenter from './costcenters/CreateCostCenter';

const Others = () => {
  return (
    <>
      <Routes>
        <Route path="Checkouts/*" />
        <Route path="CostCenters">
          <Route index element={<ListConstCenters />} />
          <Route path="CreateCostCenter" element={<CreateCostCenter />} />
        </Route>
        <Route path="Exittypes/*" />
      </Routes>
    </>
  );
};

export default Others;
