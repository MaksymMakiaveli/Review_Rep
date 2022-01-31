import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneVendor } from '@Actions/vendor.action';
import { RootState } from '@RootStateType';
import { Loader } from '@common';
import { useToggle } from '@hooks';
import Preview from '@pages/properties/vendors/EditVendor/Preview';
import Edit from '@pages/properties/vendors/EditVendor/Edit';

type VendorParams = {
  PartnerID: string;
};

interface EditVendorProps {}

const getVendorState = (state: RootState) => state.VendorReducer;

const EditVendor: React.FC<EditVendorProps> = () => {
  const params = useParams<VendorParams>();
  const dispatch = useDispatch();
  const [modeEdit, setModeEdit] = useToggle();

  const { currentVendor, loadingVendor } = useSelector(getVendorState);
  const partnerID = params.PartnerID ? params.PartnerID : '';

  useEffect(() => {
    dispatch(GetOneVendor(partnerID));
  }, []);

  if (loadingVendor || !currentVendor) {
    return <Loader />;
  }

  return (
    <div>
      <div className="padding_wrapper_page">
        {modeEdit ? (
          <Edit currentVendor={currentVendor} backToPreview={setModeEdit} />
        ) : (
          <Preview currentVendor={currentVendor} openEditPage={setModeEdit} />
        )}
      </div>
    </div>
  );
};

export default EditVendor;
