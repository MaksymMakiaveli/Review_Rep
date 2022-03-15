import React from 'react';

import { Export, Import } from '@common';
import { Button, SearchInput } from '@UiKitComponents';
import { useNavigate } from 'react-router-dom';

import classes from './ListHeaderActions.module.scss';

interface TableHeaderActionsProps {
  pageCreatingUrl: string;
  textRedirectButton: string;
  checkedItemsList?: number[] | string[];
  actionButtonExport?: () => void;
  actionButtonImport?: () => void;
  actionButtonDelete?: () => void;
}

const TableHeaderActions: React.FC<TableHeaderActionsProps> = (props) => {
  const {
    pageCreatingUrl,
    textRedirectButton,
    checkedItemsList = [],
    actionButtonExport,
    actionButtonImport,
    actionButtonDelete,
  } = props;
  const navigate = useNavigate();
  const redirectToPageCreating = () => {
    navigate(pageCreatingUrl);
  };
  return (
    <div className={classes.headerActions}>
      <div className={classes.search_wrapper}>
        <SearchInput />
      </div>
      <div className={classes.button_wrapper}>
        {checkedItemsList && !checkedItemsList.length ? (
          <>
            <Button variant="secondary" onClick={actionButtonExport} icon={<Export />}>
              Export
            </Button>
            <Button variant="secondary" onClick={actionButtonImport} icon={<Import />}>
              Import
            </Button>
            <Button variant="primary" onClick={redirectToPageCreating}>
              {textRedirectButton}
            </Button>
          </>
        ) : (
          <div className={classes.deleteButton_box}>
            <Button variant="primary" onClick={actionButtonDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default TableHeaderActions;
