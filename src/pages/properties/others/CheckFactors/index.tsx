import React, { useEffect } from 'react';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckFactorsList } from '@Actions/checkFactors.action';
import { Routes, Route } from 'react-router-dom';
import ListCheckFactors from '@pages/properties/others/CheckFactors/ListCheckFactors';

const getCheckFactorState = (state: RootState) => state.CheckFactorReducer;

const CheckFactors = () => {
  const dispatch = useDispatch();
  const { checkFactorList } = useSelector(getCheckFactorState);
  useEffect(() => {
    if (!checkFactorList.length) {
      dispatch(getCheckFactorsList());
    }
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<ListCheckFactors />} />
      </Routes>
    </>
  );
};

export default CheckFactors;
