import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@RootStateType';
import { getExitTypesList } from '@Actions/exitTypes.action';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@common';
import ListExitTypes from './ListExitType';
import CreateExitType from './CreateExitType';
import OneExitType from './OneExitType';
import { EmptyPage } from '@TypeComponents/index';

const getExitTypesState = (state: RootState) => state.ExitTypesReducer;
const ExitType = () => {
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

  if (!exitTypesList.length) {
    return (
      <EmptyPage textButton="New Exit Type" redirectPath="CreateExitType">
        <h5>You don`t have any exit type yet.</h5>
        <h5>Click the button and add a new exit type</h5>
      </EmptyPage>
    );
  }

  return (
    <>
      <Routes>
        <Route index element={<ListExitTypes />} />
        <Route path="CreateExitType" element={<CreateExitType />} />
        <Route path=":id/*" element={<OneExitType />} />
      </Routes>
    </>
  );
};

export default ExitType;
