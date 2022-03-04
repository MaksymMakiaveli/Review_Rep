import React from 'react';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TFormCreateCostCenter } from '@Types/costCenters.type';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { useBackHistory } from '@hooks';
import { TextField } from '@UiKitComponents';
import { yupResolver } from '@hookform/resolvers/yup';
import { costCenterSchema } from '@schema/costCenter';
import { postNewCostCenter } from '@Actions/costCenter.action';

interface CreateCostCenterProps {}

const getCostCenterState = (state: RootState) => state.CostCenterReducer;

const CreateCostCenter: React.FC<CreateCostCenterProps> = () => {
  const { loadingCostCenter } = useSelector(getCostCenterState);
  const backHistory = useBackHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormCreateCostCenter>({
    resolver: yupResolver(costCenterSchema),
  });

  const onSubmit = (costCenter: TFormCreateCostCenter) => {
    dispatch(postNewCostCenter(costCenter));
  };

  if (loadingCostCenter) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderSaveAction title="New Cost Center" onCancelButton={backHistory} />
          <div className="form_box">
            <InputContainer>
              <TextField
                errorText={errors.costCenterCode?.message}
                id="CostCenterCode"
                label="Cost Center Code"
                placeholder="Cost Center Code"
                {...register('costCenterCode')}
                required
              />
              <TextField
                errorText={errors.name?.message}
                id="CostCenterName"
                label="Cost Center Name"
                placeholder="Cost Center Name"
                {...register('name')}
                required
              />
            </InputContainer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCostCenter;
