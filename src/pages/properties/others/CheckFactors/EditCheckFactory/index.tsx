import React, { useEffect } from 'react';

import { getOneCheckFactory } from '@Actions/checkFactors.action';
import { Loader } from '@common';
import { useToggle } from '@hooks';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Edit from './Edit';
import Preview from './Preview';


type CheckFactoryParams = {
  checkFactoryId: string;
};

const getCheckFactoryState = (state: RootState) => state.CheckFactorReducer;

const EditCheckFactory = () => {
  const params = useParams<CheckFactoryParams>();
  const dispatch = useDispatch();
  const [modeEdit, setModeEdit] = useToggle();
  const { loadingCheckFactor, currentCheckFactor } = useSelector(getCheckFactoryState);
  const checkFactoryId = params.checkFactoryId ? params.checkFactoryId : '';

  useEffect(() => {
    dispatch(getOneCheckFactory(checkFactoryId));
  }, []);

  if (loadingCheckFactor || !currentCheckFactor) {
    return <Loader />;
  }

  return (
    <div className="padding_wrapper_page">
      {modeEdit ? (
        <Edit currentCheckFactory={currentCheckFactor} backToPreview={setModeEdit} />
      ) : (
        <Preview currentCheckFactory={currentCheckFactor} openEditPage={setModeEdit} />
      )}
    </div>
  );
};

export default EditCheckFactory;
