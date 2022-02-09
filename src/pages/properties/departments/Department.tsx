import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListDepartment from './ListDepartment';
import CreateDepartment from './CreateDepartment';
import EditDepartment from './EditDepartment'

interface DepartmentsProps {}

const Departments: React.FC<DepartmentsProps> = () => {
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