import React from 'react';

import { Button } from '@UiKitComponents';
import { useNavigate } from 'react-router-dom';

import classes from './EmptyPage.module.scss';

interface EmptyPageProps {
  textButton: string;
  redirectPath: string;
}

const EmptyPage: React.FC<EmptyPageProps> = (props) => {
  const { textButton, children, redirectPath } = props;
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`${redirectPath}`);
  };
  return (
    <div className={classes.emptyPage}>
      <div className={classes.emptyPage_wrapper}>
        <div className={classes.emptyPage_button_wrapper}>
          <Button type="button" variant="primary" onClick={onClick}>
            New {textButton}
          </Button>
        </div>
        <div className={classes.emptyPage_info}>{children}</div>
      </div>
    </div>
  );
};

export default EmptyPage;
