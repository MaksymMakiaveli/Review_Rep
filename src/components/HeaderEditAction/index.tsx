import React from 'react';

import { TrashBasket } from '@common';
import { Button } from '@UiKitComponents';

import classes from './HeaderEditAction.module.scss';
import HeaderEditActionProps from './HeaderEditAction.type';

const HeaderEditAction: React.FC<HeaderEditActionProps> = (props) => {
  const { title, openEditPage, openDeleteModal } = props;

  return (
    <div className={classes.header_box}>
      <h5>{title}</h5>
      <div className={classes.button_box}>
        <Button variant="secondary" icon={<TrashBasket />} onClick={openDeleteModal}>
          Delete
        </Button>
        <Button variant="primary" type="button" onClick={openEditPage}>
          Edit
        </Button>
      </div>
    </div>
  );
};
export default HeaderEditAction;
