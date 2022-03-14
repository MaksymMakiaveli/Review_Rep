import React, { useEffect } from 'react';

import { GetCompanyList } from '@Actions/company.action';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CreateCompany from './CreateCompany';
import EditCompany from './EditCompany';
import ListCompany from './ListCompany';

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
