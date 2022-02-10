import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SiteList from './SiteList';
import CreateSite from './CreateSite';
import EditSite from './EditSite';

interface SitesProps {}

const Sites: React.FC<SitesProps> = () => {
  return (
    <>
      <Routes>
        <Route index element={<SiteList />} />
        <Route path="NewLocation" element={<CreateSite />} />
        <Route path=":LocationID" element={<EditSite />} />
      </Routes>
    </>
  );
};
export default Sites;