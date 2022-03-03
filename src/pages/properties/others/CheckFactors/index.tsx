import React, { useEffect } from 'react';

import { getCheckFactorsList } from '@Actions/checkFactors.action';
import CreateCheckFactor from '@pages/properties/others/CheckFactors/CreateCheckFactor';
import EditCheckFactory from '@pages/properties/others/CheckFactors/EditCheckFactory';
import ListCheckFactors from '@pages/properties/others/CheckFactors/ListCheckFactors';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

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
        <Route path="CreateCheckFactor" element={<CreateCheckFactor />} />
        <Route path=":checkFactoryId" element={<EditCheckFactory />} />
      </Routes>
    </>
  );
};

export default CheckFactors;
