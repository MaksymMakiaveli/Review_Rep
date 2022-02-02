import React from 'react';
import './SidebarRS.scss';
import { Nav, Sidenav } from 'rsuite';
import { Dashboard, Logo } from '@common';

interface SidebarRSProps {}

// const panelStyles = {
//   padding: '15px 10px',
//   color: '#aaa',
// };

const SidebarRS: React.FC<SidebarRSProps> = () => {
  return (
    <div className="sidebar">
      <Sidenav>
        <Sidenav.Header>
          <Logo />
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" icon={<Dashboard />}>
              Dashboard
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SidebarRS;
