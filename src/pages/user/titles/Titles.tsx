import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TitleList from '@pages/user/titles/TitleList';
import CreateTitle from '@pages/user/titles/CreateTitle';
import EditTitle from './EditTitle';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { GetTitleList } from '@Actions/title.action';

const getTitleState = (state: RootState) => state.TitleReducer;

const Titles = () => {
  const dispatch = useDispatch();
  const { titleList } = useSelector(getTitleState);

  useEffect(() => {
    if (!titleList.length) {
      dispatch(GetTitleList());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<TitleList />} />
        <Route path="NewTitle" element={<CreateTitle />} />
        <Route path=":UserTitleID" element={<EditTitle />} />
      </Routes>
    </>
  );
};
export default Titles;