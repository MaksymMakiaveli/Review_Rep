import React, { useEffect } from 'react';

import { GetOneVendor } from '@Actions/vendor.action';
import { Loader } from '@common';
import { useToggle } from '@hooks';
import Edit from '@pages/properties/vendors/EditVendor/Edit';
import Preview from '@pages/properties/vendors/EditVendor/Preview';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
