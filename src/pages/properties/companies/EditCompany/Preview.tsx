import React from 'react';
import { HeaderEditAction, InputContainer, PreviewField } from '@components';
import { Divider, ModalDelete } from '@UiKitComponents';
import { Company } from '@Types/company.types';
import { useToggle } from '@hooks';
import { deleteCompanies } from '@Actions/company.action';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';

interface PreviewProps extends Pick<HeaderEditActionProps, 'openEditPage'> {
  currentCompany: Company;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { currentCompany, openEditPage } = props;
  const [openModal, setOpenModal] = useToggle();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCompany = () => {
    if (currentCompany) {
      dispatch(deleteCompanies([currentCompany.companyId]));
    }
    setOpenModal(!open);
    navigate('/Companies');
  };
  return (
    <>
      <HeaderEditAction
        title={currentCompany.name}
        openEditPage={openEditPage}
        openDeleteModal={setOpenModal}
      />
      <div className="form_box">
        <InputContainer title="Summary" columns={2}>
          <PreviewField label="Company Name" description={currentCompany.name} />
          <PreviewField label="Tax Office" description={currentCompany.taxOffice} />
          <PreviewField label="Company Code" description={currentCompany.companyCode} />
          <PreviewField label="TXN" description={currentCompany.taxNumber} />
        </InputContainer>
        <Divider margin="40px 0 20px 0" />
        <div className="markup_helper-box">
          <InputContainer title="Location">
            <PreviewField label="Country" description={currentCompany.city.name} />
            <PreviewField label="City" description={currentCompany.city.country?.name} />
            <PreviewField label="Address" description={currentCompany.address} />
          </InputContainer>
          <InputContainer title="Contacts">
            <PreviewField label="Email" description={currentCompany.contactName} />
            <PreviewField label="Phone number" description={currentCompany.phone} />
          </InputContainer>
        </div>
      </div>
      <ModalDelete
        title="company"
        body="the company"
        name={currentCompany.name}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={deleteCompany}
      />
    </>
  );
};
export default Preview;
