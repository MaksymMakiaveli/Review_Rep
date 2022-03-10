import React, { useEffect } from 'react';

import { GetSiteList } from '@Actions/site.action';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CreateSite from './CreateSite';
import EditSite from './EditSite';
import SiteList from './SiteList';

const getSiteState = (state: RootState) => state.SiteReducer;

const Sites = () => {
  const dispatch = useDispatch();
  const { siteList } = useSelector(getSiteState);

  useEffect(() => {
    if (!siteList.length) {
      dispatch(GetSiteList());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<SiteList />} />
        <Route path="NewSite" element={<CreateSite />} />
        <Route path=":SiteID" element={<EditSite />} />
      </Routes>
    </>
  );
};
export default Sites;