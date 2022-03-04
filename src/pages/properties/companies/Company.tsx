import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListCompany from './ListCompany';
import CreateCompany from './CreateCompany';
import EditCompany from './EditCompany';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { GetCompanyList } from '@Actions/company.action';

const getCompanyState = (state: RootState) => state.CompanyReducer;

const Company = () => {
  const dispatch = useDispatch();
  const { companyList } = useSelector(getCompanyState);

  useEffect(() => {
    if (!companyList.length) {
      dispatch(GetCompanyList());
    }
  }, [companyList]);
  return (
    <>
      <Routes>
        <Route index element={<ListCompany />} />
        <Route path="newCompany" element={<CreateCompany />} />
        <Route path=":CompanyID" element={<EditCompany />} />
      </Routes>
    </>
  );
};
export default Company;
