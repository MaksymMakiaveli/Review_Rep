import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TitleList from '@pages/TitlePages/TitleList';
// import CreateTitle from '@pages/TitlePages/CreateTitle';
// import EditTitle from './EditTitle';

interface TitlesProps {}

const Titles: React.FC<TitlesProps> = () => {
  return (
    <>
      <Routes>
        <Route index element={<TitleList />} />
        {/* <Route path="NewTitle" element={<CreateTitle />} /> */}
        {/* <Route path=":TitleID" element={<EditTitle />} /> */}
      </Routes>
    </>
  );
};
export default Titles;