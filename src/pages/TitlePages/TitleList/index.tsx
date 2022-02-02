import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetTitleList } from '@Actions/title.action';
import { RootState } from '@RootStateType';
import { EmptyPage, TableHeaderActions } from '@components';
import { CustomTable } from '@UiKitComponents';
import { Loader } from '@common';
import { DataKeyType } from '@Types/application.types';

interface ListTitleProps {}

const dataKeyTitleList: DataKeyType[] = [
  {
    key: 'userTitleCode',
    label: 'TITLE CODE',
    align: 'left',
    width: 110,
    flexGrow: 1,
    sortable: true,
  },
  {
    key: 'title',
    label: 'TITLE',
    align: 'left',
    flexGrow: 2.5,
    sortable: true,
  },
];

const getTitleState = (state: RootState) => state.TitleReducer;

const ListTitle: React.FC<ListTitleProps> = () => {
  const { titleList, loadingTitle } = useSelector(getTitleState);
  const [checkedItemsList, setCheckedItemsList] = useState<number[] | string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!titleList.length) {
      dispatch(GetTitleList());
    }
  }, [titleList]);

  if (loadingTitle) {
    return <Loader />;
  }

  if (titleList && !titleList.length) {
    return (
      <EmptyPage textButton="Title" redirectPath="newTitle">
        <h5>You don`t have any titles yet.</h5>
        <h5>Click the button and add a new title</h5>
      </EmptyPage>
    );
  }

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions
          checkedItemsList={checkedItemsList}
          pageCreatingUrl="/Titles/newTitle"
          textRedirectButton="New Title"
        />
        <CustomTable
          data={titleList}
          dataKey={dataKeyTitleList}
          currentDataKey="titleId"
          setCheckedItemsList={setCheckedItemsList}
        />
      </div>
    </div>
  );
};

export default ListTitle;
