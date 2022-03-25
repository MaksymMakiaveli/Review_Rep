import React, { useEffect, useMemo } from 'react';

import { updateDepartment } from '@Actions/department.action';
import { GetSiteList } from '@Actions/site.action';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@RootStateType';
import { schemaDepartment } from '@schema/department';
import { Department, IFormDepartment } from '@Types/department.types';
import { TextField, SelectNew } from '@UiKitComponents';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@common';

interface EditProps {
  currentDepartment: Department;
  backToPreview: () => void;
}

const getDepartmentState = (state: RootState) => state.DepartmentReducer;
const getSiteState = (state: RootState) => state.SiteReducer;

const Edit: React.FC<EditProps> = (props) => {
  const { currentDepartment, backToPreview } = props;
  const { departmentList, loadingDepartment } = useSelector(getDepartmentState);
  const { siteList, loadingSite } = useSelector(getSiteState);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IFormDepartment>({
    resolver: yupResolver(schemaDepartment),
  });

  const memoizedControl = useMemo(() => control, []);

  useEffect(() => {
    if (!siteList.length) {
      dispatch(GetSiteList());
    }
  }, []);

  const onSubmit: SubmitHandler<IFormDepartment> = (department) => {
    dispatch(
      updateDepartment(
        { ...department, departmentId: currentDepartment.departmentId },
        backToPreview
      )
    );
  };

  if (loadingDepartment || loadingSite) {
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <HeaderSaveAction
            title={currentDepartment.name}
            errors={errors}
            onCancelButton={backToPreview}
          />
          <div className="form_box">
            <InputContainer columns={2}>
              <TextField
                errorText={errors.name?.message}
                id="DepartmentName"
                placeholder="Department name"
                label="Department Name"
                defaultValue={currentDepartment.name}
                isActive
                required
                {...register('name')}
              />
              <SelectNew
                label="Parent Department"
                name="parentDepartmentId"
                control={memoizedControl}
                options={departmentList}
                optionValue="departmentId"
                optionLabel="name"
                defaultValue={currentDepartment.parentDepartmentId}
                isRequired
                isActive
              />
              <TextField
                errorText={errors.departmentCode?.message}
                id="DepartmentCode"
                placeholder="Department code"
                label="Department Code"
                defaultValue={currentDepartment.departmentCode}
                isActive
                required
                {...register('departmentCode')}
              />
              <SelectNew
                errors={errors.siteId?.message}
                label={'Site'}
                options={siteList}
                control={memoizedControl}
                name={'siteId'}
                optionValue={'siteId'}
                optionLabel={'name'}
                defaultValue={currentDepartment.siteId}
                isRequired
                isActive
              />
            </InputContainer>
          </div>
        </>
      </form>
    </>
  );
};
export default Edit;
