import React, { useMemo } from 'react';
import { ColumnsTable } from '@Types/application.types';
import { IExitTypesTable } from '@Types/exitTypes.type';
import { RootState } from '@RootStateType';
import { useSelector } from 'react-redux';
import { TableHeaderActions } from '@components';
import { Table } from '@UiKitComponents';

const columns: ColumnsTable<IExitTypesTable>[] = [
  {
    dataKey: 'code',
    headerTitle: 'Exit Type Code',
  },
  {
    dataKey: 'name',
    headerTitle: 'Exit Type Name',
    sortable: true,
  },
];

const getExitTypesState = (state: RootState) => state.ExitTypesReducer;

const ListExitTypes = () => {
  const { exitTypesList } = useSelector(getExitTypesState);

  const memoizedData = useMemo(
    () =>
      exitTypesList.map(
        (exitType): IExitTypesTable => ({
          code: exitType.code,
          name: exitType.name,
          checkFactorId: exitType.checkFactorId,
        })
      ),
    [exitTypesList]
  );

  const memoizedColumns = useMemo(() => columns, []);

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions pageCreatingUrl="CreateExitType" textRedirectButton="New Exit Type" />
        <Table
          type={'simple'}
          data={memoizedData}
          columnsConfig={memoizedColumns}
          rowKey={'checkFactorId'}
        />
      </div>
    </div>
  );
};

export default ListExitTypes;
