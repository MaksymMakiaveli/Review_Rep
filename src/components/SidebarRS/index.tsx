import React from 'react';
import './SidebarRS.scss';
import { Dropdown, Nav, Sidenav } from 'rsuite';
import {
  Asset,
  Attributes,
  Companies,
  Contracts,
  Dashboard,
  Departments,
  Depreciation,
  Locations,
  Logo,
  Other,
  Supplies,
  Vendors,
  WorkOrders,
} from '@common';
import { NavLink } from 'react-router-dom';
interface SidebarRSProps {}

type LinkListType = {
  title: string;
  link: string;
  eventKey?: string;
  icon?: JSX.Element;
  children?: LinkListType[];
};

const linkListDashboard: LinkListType[] = [
  {
    title: 'Dashboard',
    link: 'Dashboard',
    icon: <Dashboard />,
    eventKey: '1',
  },
];
const linkListManagement: LinkListType[] = [
  {
    title: 'Asset',
    link: 'Asset',
    icon: <Asset />,
    eventKey: '2',
  },
  {
    title: 'Work Orders',
    link: 'WorkOrders',
    icon: <WorkOrders />,
    eventKey: '3',
  },
  {
    title: 'Depreciation',
    link: 'Depreciation',
    icon: <Depreciation />,
    eventKey: '4',
  },
  {
    title: 'Supplies',
    link: 'Supplies',
    icon: <Supplies />,
    eventKey: '5',
  },
];
const linkListProperties: LinkListType[] = [
  {
    title: 'Attributes',
    link: 'Attributes',
    icon: <Attributes />,
    eventKey: '6',
  },
  {
    title: 'Companies',
    link: 'Companies',
    icon: <Companies />,
    eventKey: '7',
  },
  {
    title: 'Vendors',
    link: 'Vendors',
    icon: <Vendors />,
    eventKey: '8',
  },
  {
    title: 'Departments',
    link: 'Departments',
    icon: <Departments />,
    eventKey: '9',
  },
  {
    title: 'Locations',
    link: 'Locations',
    icon: <Locations />,
    eventKey: '10',
  },
  {
    title: 'Others',
    link: 'Others',
    icon: <Other />,
    eventKey: '11',
    children: [
      { link: 'Others/CostCenters', title: 'Cost Centers' },
      { link: 'Others/Checkouts', title: 'Checkouts' },
      { link: 'Others/ExitTypes', title: 'Exit Types' },
    ],
  },
  {
    title: 'Contracts',
    link: 'Contracts',
    icon: <Contracts />,
    eventKey: '12',
  },
];
const linkListUser: LinkListType[] = [
  {
    title: 'Users',
    link: 'Users',
    icon: <Dashboard />,
    eventKey: '13',
  },
  {
    title: 'Roles',
    link: 'Roles',
    icon: <Dashboard />,
    eventKey: '14',
  },
  {
    title: 'Role Autorization',
    link: 'RoleAuthorization',
    icon: <Dashboard />,
    eventKey: '15',
  },
];
console.log(linkListDashboard, linkListManagement, linkListProperties, linkListUser);

const mappedLinks = (linkList: LinkListType[]) => {
  return linkList.map((list) => {
    if (list.children && list.children.length) {
      return (
        <Dropdown key={list.link} eventKey={list.eventKey} title={list.title} icon={list.icon}>
          {list.children.map((listChildren, index) => (
            <Dropdown.Item
              key={listChildren.link}
              to={listChildren.link}
              as={NavLink}
              eventKey={`${list.eventKey}-${index + 1}`}
            >
              {listChildren.title}
            </Dropdown.Item>
          ))}
        </Dropdown>
      );
    } else {
      return (
        <Nav.Item
          key={list.link}
          as={NavLink}
          to={list.link}
          eventKey={list.eventKey}
          icon={list.icon}
        >
          {list.link}
        </Nav.Item>
      );
    }
  });
};

const SidebarRS: React.FC<SidebarRSProps> = () => {
  return (
    <div className="sidebar">
      <Sidenav>
        <Sidenav.Header>
          <Logo />
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>{mappedLinks(linkListProperties)}</Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SidebarRS;
