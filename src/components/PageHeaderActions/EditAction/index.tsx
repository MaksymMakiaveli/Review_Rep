import React from 'react';
import { Button } from '@UiKitComponents';
import classes from '../PageHeaderActions.module.scss';
import { useBackHistory } from '@hooks';

interface EditActionProps {
  title: string;
  errors?: any;
}

const EditAction = (props: EditActionProps) => {
  const { title, errors } = props;
  const backHistory = useBackHistory();

  console.log('edit', errors);

  const disabledButton = errors && !!Object.keys(errors).length;

  return (
    <div className={classes.wrapper}>
      <h5>{title}</h5>
      <div className={classes.button_box}>
        <Button variant="outline" onClick={backHistory}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={disabledButton}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditAction;
