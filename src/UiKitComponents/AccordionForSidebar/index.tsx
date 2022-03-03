import React, { ChangeEvent, memo, useEffect, useState } from 'react';

import './AccordionForSidebar.scss';
import { useLocation } from 'react-router-dom';

interface AccordionForSidebarProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const AccordionForSidebar = (props: AccordionForSidebarProps) => {
  const { title, icon, children, id } = props;
  const location = useLocation();
  const slicePathname = location.pathname.split('/')[1];
  const [open, setOpen] = useState<boolean>(slicePathname === id);

  useEffect(() => {
    setOpen(slicePathname === id);
  }, [slicePathname]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.checked);
  };

  return (
    <li className="sidebar-accordion">
      <input
        id={id}
        type="checkbox"
        name={`sidebar-accordion-${id}`}
        className="sidebar-accordion__input"
        checked={open}
        onChange={onChange}
      />
      <label htmlFor={id} className="sidebar-accordion__label">
        {icon} <span>{title}</span>
      </label>
      <div className="sidebar-accordion__content">{children}</div>
    </li>
  );
};

export default memo(AccordionForSidebar);
