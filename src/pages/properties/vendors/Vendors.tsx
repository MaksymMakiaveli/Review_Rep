import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VendorList from './VendorList';
import CreateVendor from './CreateVendor';
import EditVendor from './EditVendor';

const Vendors = () => {
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
