import React, { useEffect } from 'react';

import { GetOneDepartment } from '@Actions/department.action';
import { Loader } from '@common';
import { useToggle } from '@hooks';
import Edit from '@pages/properties/departments/EditDepartment/Edit';
import Preview from '@pages/properties/departments/EditDepartment/Preview';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

type DepartmentParams = {
  DepartmentID: string;
};

interface EditDepartmentProps {}

const getDepartmentState = (state: RootState) => state.DepartmentReducer;

const EditDepartment: React.FC<EditDepartmentProps> = () => {
  const params = useParams<DepartmentParams>();
  const dispatch = useDispatch();
  const [modeEdit, setModeEdit] = useToggle();

  const { currentDepartment, loadingDepartment } = useSelector(getDepartmentState);
  const departmentID = params.DepartmentID ? params.DepartmentID : '';
  
  useEffect(() => {
    dispatch(GetOneDepartment(departmentID));
  }, []);
  
  if (loadingDepartment || !currentDepartment) {
    return <Loader />;
  } 

  return (
    <div>
      <div className="padding_wrapper_page">
        {modeEdit ? (
          <Edit currentDepartment={currentDepartment} backToPreview={setModeEdit} />
        ) : (
          <Preview currentDepartment={currentDepartment} openEditPage={setModeEdit} />
        )}
      </div>
    </div>
  );
};

export default EditDepartment;