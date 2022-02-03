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
  link: string;
  eventKey?: string;
  icon?: JSX.Element;
  children?: LinkListType[];
};

const linkListDashboard: LinkListType[] = [
  {
    link: 'Dashboard',
    icon: <Dashboard />,
    eventKey: '1',
  },
];
const linkListManagement: LinkListType[] = [
  {
    link: 'Asset',
    icon: <Asset />,
    eventKey: '2',
  },
  {
    link: 'WorkOrders',
    icon: <WorkOrders />,
    eventKey: '3',
  },
  {
    link: 'Depreciation',
    icon: <Depreciation />,
    eventKey: '4',
  },
  {
    link: 'Supplies',
    icon: <Supplies />,
    eventKey: '5',
  },
];
const linkListProperties: LinkListType[] = [
  {
    link: 'Attributes',
    icon: <Attributes />,
    eventKey: '6',
  },
  {
    link: 'Companies',
    icon: <Companies />,
    eventKey: '7',
  },
  {
    link: 'Vendors',
    icon: <Vendors />,
    eventKey: '8',
  },
  {
    link: 'Departments',
    icon: <Departments />,
    eventKey: '9',
  },
  {
    link: 'Locations',
    icon: <Locations />,
    eventKey: '10',
  },
  {
    link: 'Others',
    icon: <Other />,
    eventKey: '11',
    children: [
      { link: 'Others/CostCenters' },
      { link: 'Other Child 2' },
      { link: 'Other Child 3' },
    ],
  },
  {
    link: 'Contracts',
    icon: <Contracts />,
    eventKey: '12',
  },
];
const linkListUser: LinkListType[] = [
  {
    link: 'Users',
    icon: <Dashboard />,
    eventKey: '13',
  },
  {
    link: 'Roles',
    icon: <Dashboard />,
    eventKey: '14',
  },
  {
    link: 'Role Authorization',
    icon: <Dashboard />,
    eventKey: '15',
  },
];
console.log(linkListDashboard, linkListManagement, linkListProperties, linkListUser);

// const panelStyles = {
//   padding: '15px 10px',
//   color: '#aaa',
// };

const mappedLinks = (linkList: LinkListType[]) => {
  return linkList.map((list) => {
    if (list.children && list.children.length) {
      return (
        <Dropdown eventKey={list.eventKey} title={list.link} icon={list.icon}>
          {list.children.map((listChildren, index) => (
            <Dropdown.Item
              to={listChildren.link}
              as={NavLink}
              eventKey={`${list.eventKey}-${index + 1}`}
            >
              {listChildren.link}
            </Dropdown.Item>
          ))}
        </Dropdown>
      );
    } else {
      return (
        <Nav.Item as={NavLink} to={list.link} eventKey={list.eventKey} icon={list.icon}>
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
