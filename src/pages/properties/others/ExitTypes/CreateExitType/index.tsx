import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ICreateExitType } from '@Types/exitTypes.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { exitTypeSchema } from '@schema/exitTypes';
import { InputContainer, PageHeaderActions } from '@TypeComponents/index';
import { TextArea, TextField } from '@UiKitComponents';
import { createNewExitType } from '@Actions/exitTypes.action';

const CreateExitType = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ICreateExitType>({
    resolver: yupResolver(exitTypeSchema),
  });

  const onSubmit = (exitType: ICreateExitType) => {
    dispatch(createNewExitType(exitType));
  };

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageHeaderActions.EditAction title="New Exit Type" errors={errors} />
          <div className="form_box">
            <InputContainer>
              <TextField
                errorText={errors.exitTypeCode?.message}
                id="ExitTypeCode"
                label="Exit Type code"
                placeholder="Exit Type code"
                {...register('exitTypeCode')}
                required
              />
              <TextField
                errorText={errors.name?.message}
                id="ExitTypeName"
                label="Exit Type name"
                placeholder="Exit Type name"
                {...register('name')}
                required
              />
              <TextArea
                label="Description"
                id="Description"
                name="description"
                placeholder="..."
                control={control}
              />
            </InputContainer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExitType;
