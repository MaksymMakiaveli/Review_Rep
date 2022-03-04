import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListDepartment from './ListDepartment';
import CreateDepartment from './CreateDepartment';
import EditDepartment from './EditDepartment';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { GetDepartmentList } from '@Actions/department.action';

const getDepartmentState = (state: RootState) => state.DepartmentReducer;

const Departments = () => {
  const dispatch = useDispatch();
  const { departmentList } = useSelector(getDepartmentState);

  useEffect(() => {
    if (!departmentList.length) {
      dispatch(GetDepartmentList());
    }
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<ListDepartment />} />
        <Route path="NewDepartment" element={<CreateDepartment />} />
        <Route path=":DepartmentID" element={<EditDepartment />} />
      </Routes>
    </>
  );
};

export default Departments;