import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@RootStateType';
import { TTitleTable } from '@Types/title.types';
import { EmptyPage, TableHeaderActions } from '@components';
import { Table } from '@UiKitComponents';
import { Loader } from '@common';
import { ColumnsTable } from '@Types/application.types';

interface ListTitleProps {}

const columnsTitleTable: ColumnsTable<TTitleTable>[] = [
  {
    dataKey: 'userTitleCode',
    title: 'TITLE CODE',
    isSorted: true,
  },
  {
    dataKey: 'title',
    title: 'TITLE',
    isSorted: true,
  },
];

const getTitleState = (state: RootState) => state.TitleReducer;

const ListTitle: React.FC<ListTitleProps> = () => {
  const { titleList, loadingTitle } = useSelector(getTitleState);

  const memoizedData = useMemo(
    () => 
      titleList.map((title): TTitleTable => {
        return {
          title: title.title,
          userTitleCode: title.userTitleCode,
          userTitleId: title.userTitleId,
        };
      }),
    [titleList]
  )

  const memoizedColumns = useMemo(() => columnsTitleTable, []);

  if (loadingTitle) {
    return <Loader />;
  }
  
  if (!titleList.length) {
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
          pageCreatingUrl="/Titles/newTitle"
          textRedirectButton="New Title"
        />
        <Table
          data={memoizedData}
          columnsConfig={memoizedColumns}
          keyTable="userTitleId"
        />
      </div>
    </div>
  );
};

export default ListTitle;
