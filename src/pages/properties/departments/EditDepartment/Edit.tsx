import React, { useEffect, useMemo } from 'react';
import { TextField, Select } from '@UiKitComponents';
import { Department, TFormCreateDepartment } from '@Types/department.types';
import { RootState } from '@RootStateType';
import { HeaderSaveAction, InputContainer } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { updateDepartment } from '@Actions/department.action';
import { GetSiteList } from '@Actions/site.action';
import { schemaDepartment } from '@schema/department';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditProps {
  currentDepartment: Department;
  backToPreview: (modeEdit: boolean) => void;
}

const getDepartmentState = (state: RootState) => state.DepartmentReducer;
const getSiteState = (state: RootState) => state.SiteReducer;

const Edit: React.FC<EditProps> = (props) => {
  const { currentDepartment, backToPreview } = props;
  const { departmentList, loadingDepartment } = useSelector(getDepartmentState);
  const { siteList, loadingSite } = useSelector(getSiteState);
  const dispatch = useDispatch();
  const parentId = currentDepartment.parentDepartmentId;
  const siteId = currentDepartment.siteId;
  const siteName = currentDepartment.site ? currentDepartment.site.name : '';
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TFormCreateDepartment>({
    resolver: yupResolver(schemaDepartment),
  });

  const memoizedControl = useMemo(() => control, []);
  const parentDefaultValue = useMemo(
    () => ({
      value: parentId,
      label: '',
    }),
    []
  );

  const siteDefaultValue = useMemo(
    () => ({
      value: siteId,
      label: siteName,
    }),
    []
  );

  useEffect(() => {
    if (!siteList.length) {
      dispatch(GetSiteList());
    }
  }, []);

  const onSubmit = (department: TFormCreateDepartment) => {
    const newDepartment = {
      ...department,
      parentDepartmentId: department.parentDepartmentId.value,
      departmentId: currentDepartment.departmentId,
      siteId: department.siteId.value,
    };
    dispatch(updateDepartment(newDepartment));
  };

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
              <Select
                label="Parent Department"
                id="ParentDepartment"
                name="parentDepartmentId"
                defaultValue={parentDefaultValue}
                control={memoizedControl}
                placeholder="Choose department"
                options={departmentList}
                optionValue="departmentId"
                optionLabel="name"
                isDisabled={loadingDepartment}
                isLoading={loadingDepartment}
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
              <Select
                errorText={errors.siteId?.value?.message}
                label="Location"
                id="Location"
                name="siteId"
                defaultValue={siteDefaultValue}
                control={memoizedControl}
                placeholder="Choose location"
                options={siteList}
                optionValue="siteId"
                optionLabel="name"
                isDisabled={loadingSite}
                isLoading={loadingSite}
                required
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
