import React from 'react';

import { HeaderSaveAction, InputContainer } from '@components';
import { CheckFactory, TFormCreateCheckFactor } from '@Types/checkFactors.type';
import { TextArea, TextField } from '@UiKitComponents';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface EditProps {
  currentCheckFactory: CheckFactory;
  backToPreview: () => void;
}

const Edit = (props: EditProps) => {
  const { currentCheckFactory, backToPreview } = props;
  const { register, control, handleSubmit } = useForm<TFormCreateCheckFactor>();
  const dispatch = useDispatch();
  console.log(dispatch);
  const onSubmit = (updatedCheckFactory: TFormCreateCheckFactor) => {
    console.log(updatedCheckFactory);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderSaveAction title={currentCheckFactory.name} onCancelButton={backToPreview} />
      <div className="form_box">
        <InputContainer>
          <TextField
            label="Check Factor Code"
            id="CheckOutCode"
            placeholder="Check Factor code"
            required
            isActive
            defaultValue={currentCheckFactory.checkFactorCode}
            {...register('checkFactorCode')}
          />
          <TextField
            label="Check Factor Reason"
            id="CheckOutReason"
            placeholder="Check Factor name"
            required
            isActive
            defaultValue={currentCheckFactory.name}
            {...register('name')}
          />
          <TextArea
            label="Description"
            id="description"
            control={control}
            name="description"
            isActive
            defaultValue={currentCheckFactory.description}
            placeholder="Enter description here ..."
          />
        </InputContainer>
      </div>
    </form>
  );
};

export default Edit;
