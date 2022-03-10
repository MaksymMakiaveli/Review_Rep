import React, { useEffect } from 'react';

import { getCostCentersList } from '@Actions/costCenter.action';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CreateCostCenter from './CreateCostCenter';
import EditCostCenter from './EditCostCenter';
import ListConstCenters from './ListCostCenters';

const getCostCenterState = (state: RootState) => state.CostCenterReducer;

const CostCenters = () => {
  const dispatch = useDispatch();
  const { costCentersList } = useSelector(getCostCenterState);

  useEffect(() => {
    if (!costCentersList.length) {
      dispatch(getCostCentersList());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<ListConstCenters />} />
        <Route path="CreateCostCenter" element={<CreateCostCenter />} />
        <Route path=":costCenterId" element={<EditCostCenter />} />
      </Routes>
    </>
  );
};

export default CostCenters;
