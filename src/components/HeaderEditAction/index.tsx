import React from 'react';

import { TrashBasket } from '@common';
import { Button } from '@UiKitComponents';

import classes from './HeaderEditAction.module.scss';
import HeaderEditActionProps from './HeaderEditAction.type';
import { useNavigate } from 'react-router-dom';

const HeaderEditAction: React.FC<HeaderEditActionProps> = (props) => {
  const { title, openEditPage, openDeleteModal } = props;
  const navigate = useNavigate();

  const redirectToEdit = () => {
    navigate('Edit');
  };

  return (
    <div className={classes.header_box}>
      <h5>{title}</h5>
      <div className={classes.button_box}>
        <Button variant="secondary" icon={<TrashBasket />} onClick={openDeleteModal}>
          Delete
        </Button>
        <Button variant="primary" type="button" onClick={openEditPage || redirectToEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
};
export default HeaderEditAction;
