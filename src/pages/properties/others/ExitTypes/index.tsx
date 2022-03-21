import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@RootStateType';
import { getExitTypesList } from '@Actions/exitTypes.action';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@common';
import ListExitTypes from './ListExitType';
import CreateExitType from './CreateExitType';
import ExitType from './ExitType';

const getExitTypesState = (state: RootState) => state.ExitTypesReducer;
const CostCenters = () => {
  const dispatch = useDispatch();
  const { exitTypesList, exitTypesLoading } = useSelector(getExitTypesState);

  useEffect(() => {
    if (!exitTypesList.length) {
      dispatch(getExitTypesList());
    }
  }, []);

  if (exitTypesLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route index element={<ListExitTypes />} />
        <Route path="CreateExitType" element={<CreateExitType />} />
        <Route path=":id/*" element={<ExitType />} />
      </Routes>
    </>
  );
};

export default CostCenters;
