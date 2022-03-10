import React, { useEffect } from 'react';

import { GetVendorList } from '@Actions/vendor.action';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CreateVendor from './CreateVendor';
import EditVendor from './EditVendor';
import VendorList from './VendorList';

const getVendorState = (state: RootState) => state.VendorReducer;

const Vendors = () => {
  const dispatch = useDispatch();
  const { vendorList } = useSelector(getVendorState);

  useEffect(() => {
    if (!vendorList.length) {
      dispatch(GetVendorList());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<VendorList />} />
        <Route path="NewVendor" element={<CreateVendor />} />
        <Route path=":PartnerID" element={<EditVendor />} />
      </Routes>
    </>
  );
};
export default Vendors;
