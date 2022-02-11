import React, { memo, useState } from 'react';
import classes from './Sidebar.module.scss';
import {
  Asset,
  Attributes,
  Companies,
  Contracts,
  Dashboard,
  Departments,
  Depreciation,
  HideBar,
  Locations,
  Logo,
  Other,
  Supplies,
  Vendors,
  WorkOrders,
} from '@common';
import cl from 'classnames';
import { NavLink } from 'react-router-dom';

interface SidebarProps {}

type LinkListType = {
  link: string;
  icon?: JSX.Element;
  children?: LinkListType[];
};

const linkListDashboard: LinkListType[] = [
  {
    link: 'Dashboard',
    icon: <Dashboard />,
  },
];
const linkListManagement: LinkListType[] = [
  {
    link: 'Asset',
    icon: <Asset />,
  },
  {
    link: 'WorkOrders',
    icon: <WorkOrders />,
  },
  {
    link: 'Depreciation',
    icon: <Depreciation />,
  },
  {
    link: 'Supplies',
    icon: <Supplies />,
  },
];
const linkListProperties: LinkListType[] = [
  {
    link: 'Attributes',
    icon: <Attributes />,
  },
  {
    link: 'Companies',
    icon: <Companies />,
  },
  {
    link: 'Vendors',
    icon: <Vendors />,
  },
  {
    link: 'Departments',
    icon: <Departments />,
  },
  {
    link: 'Locations',
    icon: <Locations />,
  },
  {
    link: 'Other',
    icon: <Other />,
    children: [{ link: 'Other Child 1' }, { link: 'Other Child 2' }, { link: 'Other Child 3' }],
  },
  {
    link: 'Contracts',
    icon: <Contracts />,
  },
];
const linkListUser: LinkListType[] = [
  {
    link: 'Users',
    icon: <Dashboard />,
  },
  {
    link: 'Roles',
    icon: <Dashboard />,
  },
  {
    link: 'RoleAuthorization',
    icon: <Dashboard />,
  },
];

const Sidebar: React.FC<SidebarProps> = () => {
  const [visibility, setVisibility] = useState(false);

  // const mappedList = (listLinks: LinkListType[]) => {
  //   return listLinks.map((itemList) => {
  //     if (itemList.children && itemList.children.length) {
  //       return (
  //         <li key={itemList.link} className={classes.list_item}>
  //           <Dropdown title={itemList.link} icon={itemList.icon}>
  //             {itemList.children.map((children) => (
  //               <Dropdown.Item key={children.link}>
  //                 <NavLink
  //                   to={children.link}
  //                   className={({ isActive }) => (isActive ? classes.activeLink : '')}
  //                 >
  //                   <span>{children.link}</span>
  //                 </NavLink>
  //               </Dropdown.Item>
  //             ))}
  //           </Dropdown>
  //         </li>
  //       );
  //     } else {
  //       return (
  //         <li key={itemList.link} className={classes.list_item}>
  //           {itemList.icon}
  //           <NavLink
  //             to={itemList.link}
  //             className={({ isActive }) => (isActive ? classes.activeLink : '')}
  //           >
  //             <span>{itemList.link}</span>
  //           </NavLink>
  //         </li>
  //       );
  //     }
  //   });
  // };

  return (
    <aside
      className={cl(classes.sidebar, 'sidebar', {
        [classes.sidebar_show]: visibility,
      })}
    >
      <div className={classes.wrapper}>
        <div className={classes.logo_box}>
          <Logo />
          <button className={classes.button_show} onClick={() => setVisibility(!visibility)}>
            <HideBar />
          </button>
        </div>
        <nav className={classes.navigation}>
          <ul className={classes.list}>
            {linkListDashboard.map((itemList) => (
              <li key={itemList.link} className={classes.list_item}>
                {itemList.icon}
                <NavLink
                  to={itemList.link}
                  className={({ isActive }) => (isActive ? classes.activeLink : '')}
                >
                  <span>{itemList.link}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <h5 className={classes.title_overline}>management</h5>
          <ul className={classes.list}>
            {linkListManagement.map((itemList) => (
              <li key={itemList.link} className={classes.list_item}>
                {itemList.icon}
                <NavLink
                  to={itemList.link}
                  className={({ isActive }) => (isActive ? classes.activeLink : '')}
                >
                  <span>{itemList.link}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <h5 className={classes.title_overline}>properties</h5>
          <ul className={classes.list}>
            {linkListProperties.map((itemList) => (
              <li key={itemList.link} className={classes.list_item}>
                {itemList.icon}
                <NavLink
                  to={itemList.link}
                  className={({ isActive }) => (isActive ? classes.activeLink : '')}
                >
                  <span>{itemList.link}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <h5 className={classes.title_overline}>user</h5>
          <ul className={classes.list}>
            {linkListUser.map((itemList) => (
              <li key={itemList.link} className={classes.list_item}>
                {itemList.icon}
                <NavLink
                  to={itemList.link}
                  className={({ isActive }) => (isActive ? classes.activeLink : '')}
                >
                  <span>{itemList.link}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default memo(Sidebar);
