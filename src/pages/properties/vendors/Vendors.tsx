import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VendorList from './VendorList';
import CreateVendor from './CreateVendor';
import EditVendor from './EditVendor';

interface VendorsProps {}

const Vendors: React.FC<VendorsProps> = () => {
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
