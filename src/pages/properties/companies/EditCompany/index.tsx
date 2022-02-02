import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneCompany } from '@Actions/company.action';
import { RootState } from '@RootStateType';
import { Loader } from '@common';
import { useToggle } from '@hooks';
import Preview from '@pages/properties/companies/EditCompany/Preview';
import Edit from '@pages/properties/companies/EditCompany/Edit';

type CompanyParams = {
  CompanyID: string;
};

interface EditCompanyProps {}

const getCompanyState = (state: RootState) => state.CompanyReducer;

const EditCompany: React.FC<EditCompanyProps> = () => {
  const params = useParams<CompanyParams>();
  const dispatch = useDispatch();
  const [modeEdit, setModeEdit] = useToggle();

  const { currentCompany, loadingCompany } = useSelector(getCompanyState);
  const companyID = params.CompanyID ? params.CompanyID : '';

  useEffect(() => {
    dispatch(GetOneCompany(companyID));
  }, []);

  if (loadingCompany || !currentCompany) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        {modeEdit ? (
          <Edit currentCompany={currentCompany} backToPreview={setModeEdit} />
        ) : (
          <Preview currentCompany={currentCompany} openEditPage={setModeEdit} />
        )}
      </div>
    </div>
  );
};

export default EditCompany;
