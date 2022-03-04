import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@RootStateType';
import { TextField, Select } from '@UiKitComponents';
import { TFormCreateDepartment } from '@Types/department.types';
import { postNewDepartment } from '@Actions/department.action';
import { GetSiteList } from '@Actions/site.action';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { useBackHistory } from '@hooks';
import { schemaDepartment } from '@schema/department';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface CreateDepartmentProps {}

const getDepartmentState = (state: RootState) => state.DepartmentReducer;
const getSiteState = (state: RootState) => state.SiteReducer;

const CreateDepartment: React.FC<CreateDepartmentProps> = () => {
  const { departmentList, loadingDepartment } = useSelector(getDepartmentState);
  const { siteList, loadingSite } = useSelector(getSiteState);

  const dispatch = useDispatch();
  const backHistory = useBackHistory();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TFormCreateDepartment>({
    resolver: yupResolver(schemaDepartment),
  });

  const memoizedControl = useMemo(() => control, []);

  const onSubmit = (department: TFormCreateDepartment) => {
    const newDepartment = {
      ...department,
      parentDepartmentId: department.parentDepartmentId ? department.parentDepartmentId.value : undefined,
      siteId: department.siteId.value,
    };
    
    dispatch(postNewDepartment(newDepartment));
  };

  useEffect(() => {
    if (!siteList.length) {
      dispatch(GetSiteList());
    }
  }, []);

  if (loadingDepartment) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <HeaderSaveAction
                title="New Department"
                errors={errors}
                onCancelButton={backHistory}
              />
              <div className="form_box">
                <InputContainer columns={2}>
                  <TextField
                    errorText={errors.name?.message}
                    id="DepartmentName"
                    placeholder="Department name"
                    label="Department Name"
                    required
                    {...register('name')}
                  />
                  <Select
                    label="Parent Department"
                    id="ParentDepartment"
                    name="parentDepartmentId"
                    control={memoizedControl}
                    placeholder="Choose department"
                    options={departmentList}
                    optionValue="departmentId"
                    optionLabel="name"
                    isDisabled={loadingDepartment}
                    isLoading={loadingDepartment}
                  />
                  <TextField
                    errorText={errors.departmentCode?.message}
                    id="DepartmentCode"
                    placeholder="Department code"
                    label="Department Code"
                    required
                    {...register('departmentCode')}
                  />
                  <Select
                    errorText={errors.siteId?.value?.message}
                    label="Location"
                    id="Location"
                    name="siteId"
                    control={memoizedControl}
                    placeholder="Choose location"
                    options={siteList}
                    optionValue="siteId"
                    optionLabel="name"
                    isDisabled={loadingSite}
                    isLoading={loadingSite}
                    required
                  />
                  </InputContainer>
                </div>
            </>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateDepartment);