import React, { useEffect } from 'react';

import { GetOneCompany } from '@Actions/company.action';
import { Loader } from '@common';
import Edit from '@pages/properties/companies/OneCompany/Edit';
import Preview from '@pages/properties/companies/OneCompany/Preview';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';

type CompanyParams = {
  id: string;
};

interface EditCompanyProps {}

const getCompanyState = (state: RootState) => state.CompanyReducer;

const OneCompany: React.FC<EditCompanyProps> = () => {
  const { company } = useSelector(getCompanyState);
  const params = useParams<CompanyParams>();
  const dispatch = useDispatch();

  const id = params.id ? params.id : '';

  useEffect(() => {
    if (!company || company.companyId !== +id) {
      dispatch(GetOneCompany(id));
    }
  }, []);

  if (!company) {
    return <Loader />;
  }

  return (
    <div className="padding_wrapper_page">
      <Routes>
        <Route index element={<Preview company={company} />} />
        <Route path="Edit" element={<Edit company={company} />} />
      </Routes>
    </div>
  );
};

export default OneCompany;
