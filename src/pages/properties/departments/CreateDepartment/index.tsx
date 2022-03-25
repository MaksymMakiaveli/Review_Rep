import React, { memo, useEffect, useMemo } from 'react';

import { GetSiteList } from '@Actions/site.action';
import { Loader } from '@common';
import { HeaderSaveAction, InputContainer } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackHistory } from '@hooks';
import { RootState } from '@RootStateType';
import { schemaDepartment } from '@schema/department';
import { IFormDepartment } from '@Types/department.types';
import { TextField, SelectNew } from '@UiKitComponents';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { postNewDepartment } from '@Actions/department.action';

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
  } = useForm<IFormDepartment>({
    resolver: yupResolver(schemaDepartment),
  });

  const memoizedControl = useMemo(() => control, []);

  const onSubmit: SubmitHandler<IFormDepartment> = (department) => {
    dispatch(postNewDepartment(department));
  };

  useEffect(() => {
    if (!siteList.length) {
      dispatch(GetSiteList());
    }
  }, []);

  if (loadingDepartment || loadingSite) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <HeaderSaveAction title="New Department" errors={errors} onCancelButton={backHistory} />
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
                <SelectNew
                  label="Parent Department"
                  name="parentDepartmentId"
                  control={memoizedControl}
                  options={departmentList}
                  optionValue="departmentId"
                  optionLabel="name"
                />
                <TextField
                  errorText={errors.departmentCode?.message}
                  id="DepartmentCode"
                  placeholder="Department code"
                  label="Department Code"
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
                  isRequired
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
