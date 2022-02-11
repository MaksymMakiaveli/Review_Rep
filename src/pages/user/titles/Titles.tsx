import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TitleList from '@pages/user/titles/TitleList';
import CreateTitle from '@pages/user/titles/CreateTitle';
import EditTitle from './EditTitle';

interface TitlesProps {}

const Titles: React.FC<TitlesProps> = () => {
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