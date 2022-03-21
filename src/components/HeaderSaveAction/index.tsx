import React from 'react';

import { Button } from '@UiKitComponents';

import classes from './HeaderSaveAction.module.scss';
import { useBackHistory } from '@hooks';

interface HeaderSaveActionProps {
  title: string;
  errors?: object;
  onCancelButton?: (params?: any) => void;
}

const HeaderSaveAction: React.FC<HeaderSaveActionProps> = (props) => {
  const { title, errors, onCancelButton } = props;

  const disabledButton = errors && !!Object.keys(errors).length;

  const back = useBackHistory();

  return (
    <div className={classes.header_box}>
      <h5>{title}</h5>
      <div className={classes.button_box}>
        <Button variant="outline" onClick={onCancelButton || back}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={disabledButton}>
          Save
        </Button>
      </div>
    </div>
  );
};
export default HeaderSaveAction;
