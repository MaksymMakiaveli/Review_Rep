import React from 'react';
import { Button, Modals } from '@UiKitComponents';
import { TrashBasket } from '@common';
import classes from '../PageHeaderActions.module.scss';
import { useNavigate } from 'react-router-dom';
import { useBackHistory, useToggle } from '@hooks';
import { Back } from '@common';

interface PreviewActionProps {
  title: string;
  deleteAction: () => void;
}

const PreviewAction = (props: PreviewActionProps) => {
  const { title, deleteAction } = props;
  const navigate = useNavigate();
  const onBackHistory = useBackHistory();
  const [open, setOpen] = useToggle();

  const redirectToEdit = () => {
    navigate('Edit');
  };

  const openModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <button onClick={onBackHistory} type="button" className={classes.linkBack}>
        <Back /> Back
      </button>
      <div className={classes.wrapper}>
        <h5>{title}</h5>
        <div className={classes.button_box}>
          <Button variant="secondary" icon={<TrashBasket />} onClick={openModal}>
            Delete
          </Button>
          <Button variant="primary" type="button" onClick={redirectToEdit}>
            Edit
          </Button>
        </div>
      </div>
      <Modals.ModalDelete deleteAction={deleteAction} name={title} open={open} setOpen={setOpen} />
    </>
  );
};

export default PreviewAction;
