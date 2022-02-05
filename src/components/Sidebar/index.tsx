import React from 'react';
import './Sidebar.scss';
import {
  Asset,
  Attributes,
  Companies,
  Contracts,
  Dashboard,
  Departments,
  HideBar,
  Locations,
  Logo,
  Other,
  Supplies,
  Vendors,
  WorkOrders,
} from '@common';
import { NavLink } from 'react-router-dom';
import SidebarProps, { LinkListType } from './Sidebar.type';
import { AccordionForSidebar } from '@UiKitComponents';

const linkListDashboard: LinkListType[] = [
  {
    title: 'Dashboard',
    link: 'Dashboard',
    icon: <Dashboard />,
  },
];
const linkListManagement: LinkListType[] = [
  {
    title: 'Asset',
    link: 'Asset',
    icon: <Asset />,
  },
  {
    title: 'Work Orders',
    link: 'WorkOrders',
    icon: <WorkOrders />,
  },
  {
    title: 'Supplies',
    link: 'Supplies',
    icon: <Supplies />,
  },
];
const linkListProperties: LinkListType[] = [
  {
    title: 'Attributes',
    link: 'Attributes',
    icon: <Attributes />,
  },
  {
    title: 'Companies',
    link: 'Companies',
    icon: <Companies />,
  },
  {
    title: 'Vendors',
    link: 'Vendors',
    icon: <Vendors />,
  },
  {
    title: 'Departments',
    link: 'Departments',
    icon: <Departments />,
  },
  {
    title: 'Locations',
    link: 'Locations',
    icon: <Locations />,
  },
  {
    title: 'Others',
    link: 'Others',
    icon: <Other />,
    children: [
      { link: 'Others/CostCenters', title: 'Cost Centers', icon: <Other /> },
      { link: 'Others/CheckFactors', title: 'CheckFactors', icon: <Other /> },
      { link: 'Others/ExitTypes', title: 'Exit Types', icon: <Other /> },
    ],
  },
  {
    title: 'Contracts',
    link: 'Contracts',
    icon: <Contracts />,
  },
];
const linkListUser: LinkListType[] = [
  {
    title: 'Users',
    link: 'Users',
    icon: <Dashboard />,
  },
  {
    title: 'Roles',
    link: 'Roles',
    icon: <Dashboard />,
  },
  {
    title: 'Role Autorization',
    link: 'RoleAuthorization',
    icon: <Dashboard />,
  },
];

const mappedLinkList = (linkList: LinkListType[]) => {
  return linkList.map((item) => {
    if (item.children && item.children.length) {
      return (
        <AccordionForSidebar id={item.link} key={item.link} title={item.title} icon={item.icon}>
          {item.children.map((childrenLink) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'activeLink' : '')}
              to={childrenLink.link}
              key={childrenLink.link}
            >
              {childrenLink.icon} <span>{childrenLink.title}</span>
            </NavLink>
          ))}
        </AccordionForSidebar>
      );
    } else {
      return (
        <li className="navigation__list_item" key={item.link}>
          <NavLink className={({ isActive }) => (isActive ? 'activeLink' : '')} to={item.link}>
            {item.icon} <span>{item.title}</span>
          </NavLink>
        </li>
      );
    }
  });
};

const SidebarRS: React.FC<SidebarProps> = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar--wrapper">
        <div className="sidebar__logo">
          <NavLink to="/">
            <Logo />
          </NavLink>
          <button className="sidebar__button-show">
            <HideBar />
          </button>
        </div>
        <nav className="sidebar__navigation navigation">
          <ul className="navigation__list">
            {mappedLinkList(linkListDashboard)}
            <h5 className="navigation__title-overline">management</h5>
            {mappedLinkList(linkListManagement)}
            <h5 className="navigation__title-overline">properties</h5>
            {mappedLinkList(linkListProperties)}
            <h5 className="navigation__title-overline">user</h5>
            {mappedLinkList(linkListUser)}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarRS;
