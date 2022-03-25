import React from 'react';
import { ICreateExitType, IExitTypes, IUpdateExitType } from '@Types/exitTypes.type';
import { useForm } from 'react-hook-form';
import { InputContainer, PageHeaderActions } from '@components';
import { TextArea, TextField } from '@UiKitComponents';
import { useDispatch } from 'react-redux';
import { updateExitType } from '@Actions/exitTypes.action';
import { yupResolver } from '@hookform/resolvers/yup';
import { exitTypeSchema } from '@schema/exitTypes';

interface EditExitTypeProps {
  exitType: IExitTypes;
}

const EditExitType = (props: EditExitTypeProps) => {
  const { exitType } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IUpdateExitType>({
    resolver: yupResolver(exitTypeSchema),
  });

  const onSubmit = (updatedExitType: ICreateExitType) => {
    const body: IUpdateExitType = {
      ...updatedExitType,
      checkFactorId: exitType.checkFactorId,
    };
    dispatch(updateExitType(body));
  };

  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeaderActions.SaveForm title={exitType.name} errors={errors} />
        <div className="form_box">
          <InputContainer>
            <TextField
              errorText={errors.exitTypeCode?.message}
              id="ExitTypeCode"
              label="Exit Type code"
              placeholder="Exit Type code"
              {...register('exitTypeCode')}
              defaultValue={exitType.code}
              isActive
              required
            />
            <TextField
              errorText={errors.name?.message}
              id="ExitTypeName"
              label="Exit Type name"
              placeholder="Exit Type name"
              {...register('name')}
              defaultValue={exitType.name}
              isActive
              required
            />
            <TextArea
              label="Description"
              id="Description"
              name="description"
              control={control}
              placeholder="..."
              defaultValue={exitType.description}
              isActive
            />
          </InputContainer>
        </div>
      </form>
    </>
  );
};

export default EditExitType;
