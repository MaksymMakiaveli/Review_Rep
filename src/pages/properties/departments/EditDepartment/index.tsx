import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@RootStateType';
import { Loader } from '@common';
import { GetOneDepartment } from '@Actions/department.action';
import { GetOneSite } from '@Actions/site.action';
import { useToggle } from '@hooks';
import Preview from '@pages/properties/departments/EditDepartment/Preview';
import Edit from '@pages/properties/departments/EditDepartment/Edit';

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
  // const { currentSite } = useSelector(getSiteState);
  const departmentID = params.DepartmentID ? params.DepartmentID : '';
  
  useEffect(() => {
    dispatch(GetOneDepartment(departmentID));
  }, []);

  useEffect(() => {
    if(currentDepartment) {
      dispatch(GetOneSite(currentDepartment.siteId));
    }
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