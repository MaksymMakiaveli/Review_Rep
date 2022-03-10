import React, { memo, useEffect, useState } from 'react';

import { Bell, DropArrow, Info, Search } from '@common';
import avatar from '@image/avatar.png';
import cl from 'classnames';
import { useLocation } from 'react-router-dom';

import classes from './Header.module.scss';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState<string>();
  const pathSlice = () => {
    const path = pathname.split('/');
    setTitle(path[1]);
  };

  useEffect(() => {
    pathSlice();
  }, [pathname]);

  return (
    <header className={cl(classes.header, 'header')}>
      <div className={classes.header_box}>
        <div className={classes.name_page}>
          <h4>{title}</h4>
        </div>
        <div className={classes.header_actions}>
          <div className={classes.simple_actions}>
            <a href="">
              <Search />
            </a>
            <a href="">
              <Info />
            </a>
            <a href="">
              <Bell />
            </a>
          </div>
          <div className={classes.user_actions}>
            <div className={classes.avatar_box}>
              <img src={avatar} alt="" />
              <p>Frederic Ewing</p>
            </div>
            <DropArrow color="blue" />
          </div>
        </div>
      </div>
    </header>
  );
};
export default memo(Header);
