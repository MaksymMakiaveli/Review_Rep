import React from 'react';

import { deleteCompaniesById } from '@Actions/company.action';
import { InputContainer, PageHeaderActions, PreviewField } from '@components';
import { Company } from '@Types/company.types';
import { Divider } from '@UiKitComponents';
import { useDispatch } from 'react-redux';

interface PreviewProps {
  company: Company;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { company } = props;
  const dispatch = useDispatch();

  const deleteCompany = () => {
    dispatch(deleteCompaniesById([company.companyId]));
  };

  return (
    <>
      <PageHeaderActions.Preview title={company.name} deleteAction={deleteCompany} />
      <div className="form_box">
        <InputContainer title="Summary" columns={2}>
          <PreviewField label="Company Name" description={company.name} />
          <PreviewField label="Tax Office" description={company.taxOffice} />
          <PreviewField label="Company Code" description={company.companyCode} />
          <PreviewField label="TXN" description={company.taxNumber} />
        </InputContainer>
        <Divider margin="40px 0 20px 0" />
        <div className="markup_helper-box">
          <InputContainer title="Location">
            <PreviewField label="Country" description={company.city.country?.name} />
            <PreviewField label="City" description={company.city.name} />
            <PreviewField label="Address" description={company.address} />
          </InputContainer>
          <InputContainer title="Contacts">
            <PreviewField label="Email" description={company.contactName} />
            <PreviewField label="Phone number" description={company.phone} />
          </InputContainer>
        </div>
      </div>
    </>
  );
};
export default Preview;
