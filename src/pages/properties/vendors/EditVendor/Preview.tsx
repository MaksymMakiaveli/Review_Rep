import React from 'react';

import { deleteVendor } from '@Actions/vendor.action';
import { HeaderEditAction, InputContainer, PreviewField } from '@components';
import { useToggle } from '@hooks';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';
import { Vendor } from '@Types/vendor.types';
import { Divider, ModalDelete } from '@UiKitComponents';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface PreviewProps extends Pick<HeaderEditActionProps, 'openEditPage'> {
  currentVendor: Vendor;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { currentVendor, openEditPage } = props;
  const [openModal, setOpenModal] = useToggle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cityName: string = currentVendor.city.name;
  const countryName: string = currentVendor.city.country?.name;

  const deleteVendors = () => {
    if (currentVendor) {
      dispatch(deleteVendor([currentVendor.partnerId], currentVendor.name));
    }
    setOpenModal(!open);
    navigate('/Vendors');
  };

  return (
    <>
      <HeaderEditAction
        title={currentVendor.name}
        openEditPage={openEditPage}
        openDeleteModal={setOpenModal}
      />
      <div className="form_box">
        <InputContainer title="Summary" columns={2}>
          <PreviewField label="Vendor Name" description={currentVendor.name} />
          <PreviewField label="Tax Office" description={currentVendor.taxOffice} />
          <PreviewField label="Vendor Code" description={currentVendor.partnerCode} />
          <PreviewField label="TXN" description={currentVendor.taxNumber} />
        </InputContainer>
        <Divider margin="40px 0 20px 0" />
        <div className="markup_helper-box">
          <InputContainer title="Location">
            <PreviewField label="Country" description={countryName} />
            <PreviewField label="City" description={cityName} />
            <PreviewField label="Address" description={currentVendor.address} />
          </InputContainer>
          <InputContainer title="Contacts">
            <PreviewField label="Email" description={currentVendor.email} />
            <PreviewField label="Phone number" description={currentVendor.phone} />
          </InputContainer>
        </div>
      </div>
      <ModalDelete
        title="vendor"
        body="the vendor"
        name={currentVendor.name}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={deleteVendors}
      />
    </>
  );
};

export default Preview;
