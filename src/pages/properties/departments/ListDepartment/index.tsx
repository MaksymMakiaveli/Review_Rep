import React, { useMemo } from 'react';

import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { RootState } from '@RootStateType';
import { ColumnsTableRS } from '@Types/application.types';
import { Department, TDepartmentTable } from '@Types/department.types';
// import { Table } from '@UiKitComponents';
import { useSelector } from 'react-redux';
// import { ResultDrop } from '../../../../UiKitComponents/Table/TableTypes.type';
// import { changeParentForDepartments } from '@Actions/department.action';
import TableRS from '../../../../UiKitComponents/TableRS';

interface ListDepartmentProps {}

// const columnsDepartmentTable: ColumnsTable<TDepartmentTable>[] = [
//   {
//     dataKey: 'departmentCode',
//     title: 'DEPARTMENT CODE',
//     isSorted: true,
//   },
//   {
//     dataKey: 'name',
//     title: 'DEPARTMENT NAME',
//     isSorted: true,
//   },
//   {
//     dataKey: 'parentName',
//     title: 'PARENT DEPARTMENT',
//   },
//   {
//     dataKey: 'siteName',
//     title: 'LOCATION',
//     isSorted: true,
//   },
// ];

const columnsDepartmentTableRS: ColumnsTableRS<TDepartmentTable>[] = [
  {
    dataKey: 'departmentCode',
    headerTitle: 'DEPARTMENT CODE',
    flexGrow: 1,
    sortable: true,
  },
  {
    dataKey: 'name',
    headerTitle: 'DEPARTMENT NAME',
    flexGrow: 1,
    sortable: true,
  },
  {
    dataKey: 'parentName',
    headerTitle: 'PARENT DEPARTMENT',

    flexGrow: 1,
  },
  {
    dataKey: 'siteName',
    headerTitle: 'LOCATION',
    flexGrow: 1,
    sortable: true,
  },
];

const getDepartmentState = (state: RootState) => state.DepartmentReducer;

const ListDepartment: React.FC<ListDepartmentProps> = () => {
  const { departmentList, loadingDepartment } = useSelector(getDepartmentState);
  // const dispatch = useDispatch();

  const handleData = (dep: Department[]) => {
    return dep.map((department): TDepartmentTable => {
      const parentName = department.parentDepartment ? department.parentDepartment.name : '';
      const siteName = department.site ? department.site.name : '';
      return {
        name: department.name,
        departmentCode: department.departmentCode,
        parentName: parentName,
        siteName: siteName,
        departmentId: department.departmentId,
        parentId: department.parentDepartmentId,
        children: handleData(department.childDepartment),
      };
    });
  };
  const memoizedData = useMemo(() => handleData(departmentList), [departmentList]);
  // const memoizedColumns = useMemo(() => columnsDepartmentTable, []);

  if (loadingDepartment) {
    return <Loader />;
  }

  if (departmentList && !departmentList.length) {
    return (
      <EmptyPage textButton="Department" redirectPath="newDepartment">
        <h5>You don`t have departments yet</h5>
        <h5>Click the button and create a new department</h5>
      </EmptyPage>
    );
  }

  // const changeParentIds = (result: ResultDrop<TDepartmentTable>) => {
  //   const { draggingItem, focusItem } = result;
  //   dispatch(changeParentForDepartments(draggingItem, focusItem));
  // };

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions
          pageCreatingUrl="/Departments/newDepartment"
          textRedirectButton="New Department"
        />
        {/*<Table*/}
        {/*  data={memoizedData}*/}
        {/*  columnsConfig={memoizedColumns}*/}
        {/*  keyTable="departmentId"*/}
        {/*  actionForDrag={changeParentIds}*/}
        {/*  isDraggable*/}
        {/*/>*/}
        <TableRS
          type={'complex'}
          data={memoizedData}
          columnsConfig={columnsDepartmentTableRS}
          rowKey={'departmentId'}
          isTree
          isDraggable
          keyForParentId={'parentId'}
        />
      </div>
    </div>
  );
};

export default ListDepartment;
