import React, { useEffect } from 'react';

import { GetCompanyList } from '@Actions/company.action';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CreateCompany from './CreateCompany';
import OneCompany from './OneCompany';
import ListCompany from './ListCompany';
import { Loader } from '@common';
import { EmptyPage } from '@TypeComponents/index';

const getCompanyState = (state: RootState) => state.CompanyReducer;

const Company = () => {
  const dispatch = useDispatch();
  const { companyList, companyLoading } = useSelector(getCompanyState);

  useEffect(() => {
    if (!companyList.length) {
      dispatch(GetCompanyList());
    }
  }, [companyList]);

  if (companyLoading) {
    return <Loader />;
  }

  if (!companyList || !companyList.length) {
    return (
      <EmptyPage textButton="New Company" redirectPath="CreateCompany">
        <h5>You don`t have companies yet</h5>
        <h5>Click the button and create a new company</h5>
      </EmptyPage>
    );
  }

  return (
    <>
      <Routes>
        <Route index element={<ListCompany />} />
        <Route path="CreateCompany" element={<CreateCompany />} />
        <Route path=":id/*" element={<OneCompany />} />
      </Routes>
    </>
  );
};
export default Company;
