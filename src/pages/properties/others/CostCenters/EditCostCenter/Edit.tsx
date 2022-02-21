import React from 'react';
import { CostCenter, TFormCreateCostCenter } from '@Types/costCenters.type';
import { useForm } from 'react-hook-form';
import { HeaderSaveAction, InputContainer } from '@TypeComponents/index';
import { TextField } from '@UiKitComponents';
import { yupResolver } from '@hookform/resolvers/yup';
import { costCenterSchema } from '@schema/costCenter';
import { useDispatch } from 'react-redux';
import { updateCostCenter } from '@Actions/costCenter.action';

interface EditProps {
  currentCostCenter: CostCenter;
  backToPreview: () => void;
}

const Edit: React.FC<EditProps> = (props) => {
  const { currentCostCenter, backToPreview } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormCreateCostCenter>({
    resolver: yupResolver(costCenterSchema),
  });
  const dispatch = useDispatch();

  const onSubmit = (costCenter: TFormCreateCostCenter) => {
    const newConstCenter = {
      ...costCenter,
      costCenterId: currentCostCenter.costCenterId,
    };
    dispatch(updateCostCenter(newConstCenter, backToPreview));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderSaveAction
        title={currentCostCenter.name}
        errors={errors}
        onCancelButton={backToPreview}
      />
      <div className="form_box">
        <InputContainer>
          <TextField
            errorText={errors.costCenterCode?.message}
            id="CostCenterCode"
            label="Cost Center Code"
            placeholder="Cost Center Code"
            {...register('costCenterCode')}
            defaultValue={currentCostCenter.costCenterCode}
            required
            isActive
          />
          <TextField
            errorText={errors.name?.message}
            id="CostCenterName"
            label="Cost Center Name"
            placeholder="Cost Center Name"
            {...register('name')}
            defaultValue={currentCostCenter.name}
            required
            isActive
          />
        </InputContainer>
      </div>
    </form>
  );
};

export default Edit;
