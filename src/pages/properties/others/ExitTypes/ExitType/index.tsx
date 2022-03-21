import React, { useEffect } from 'react';
import PreviewExitType from './Preview';
import { Routes, Route, useParams } from 'react-router-dom';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { getExitTypeById } from '@Actions/exitTypes.action';
import { Loader } from '@common';
import EditExitType from '@pages/properties/others/ExitTypes/ExitType/Edit';
import { useBackHistory } from '@hooks';

type ExitTypeParams = {
  id: string;
};

const getExitTypesState = (state: RootState) => state.ExitTypesReducer;

const ExitType = () => {
  const { exitType, exitTypeError } = useSelector(getExitTypesState);
  const params = useParams<ExitTypeParams>();
  const dispatch = useDispatch();
  const backHistory = useBackHistory();
  const id = params.id ? params.id : '';

  useEffect(() => {
    if (exitType && exitType.checkFactorId === +id) {
      return;
    }
    if (exitTypeError) {
      backHistory();
      return;
    }
    dispatch(getExitTypeById(id));
  }, []);

  if (!exitType) {
    return <Loader />;
  }

  return (
    <div className="padding_wrapper_page">
      <Routes>
        <Route index element={<PreviewExitType exitType={exitType} />} />
        <Route path="Edit" element={<EditExitType exitType={exitType} />} />
      </Routes>
    </div>
  );
};

export default ExitType;
