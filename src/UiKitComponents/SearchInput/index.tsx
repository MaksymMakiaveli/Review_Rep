import React from 'react';

import { Search } from '@common';

import classes from './SearchInput.module.scss';

const SearchInput = () => {
  return (
    <div className={classes.searchInput}>
      <input type="text" placeholder="Search" />
      <span className={classes.searchInput_icon}>
        <Search />
      </span>
    </div>
  );
};
export default SearchInput;
