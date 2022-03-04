import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SiteList from './SiteList';
import CreateSite from './CreateSite';
import EditSite from './EditSite';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { GetSiteList } from '@Actions/site.action';

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
        <Route path="NewLocation" element={<CreateSite />} />
        <Route path=":LocationID" element={<EditSite />} />
      </Routes>
    </>
  );
};
export default Sites;