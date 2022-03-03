import React from 'react';

import { postNewCheckFactor } from '@Actions/checkFactors.action';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { useBackHistory } from '@hooks';
import { RootState } from '@RootStateType';
import { TFormCreateCheckFactor } from '@Types/checkFactors.type';
import { TextArea, TextField } from '@UiKitComponents';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const getCheckFactorState = (state: RootState) => state.CheckFactorReducer;

const CreateCheckFactor = () => {
  const { loadingCheckFactor } = useSelector(getCheckFactorState);
  const backHistory = useBackHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm<TFormCreateCheckFactor>();

  const onSubmit = (checkFactor: TFormCreateCheckFactor) => {
    dispatch(postNewCheckFactor(checkFactor));
  };

  if (loadingCheckFactor) {
    return <Loader />;
  }
  return (
    <div className="padding_wrapper_page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderSaveAction title="New Check Factor" onCancelButton={backHistory} />
        <div className="form_box">
          <InputContainer>
            <TextField
              label="Check Factor Code"
              id="CheckOutCode"
              placeholder="Check Factor code"
              required
              {...register('checkFactorCode')}
            />
            <TextField
              label="Check Factor Reason"
              id="CheckOutReason"
              placeholder="Check Factor name"
              required
              {...register('name')}
            />
            <TextArea
              label="Description"
              id="description"
              control={control}
              name="description"
              placeholder="Enter description here ..."
            />
          </InputContainer>
        </div>
      </form>
    </div>
  );
};

export default CreateCheckFactor;
