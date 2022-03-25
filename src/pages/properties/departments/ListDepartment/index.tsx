import React, { useCallback, useMemo } from 'react';

import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { RootState } from '@RootStateType';
import { ColumnsTable } from '@Types/application.types';
import { Department, IDepartmentTable } from '@Types/department.types';
import { useDispatch, useSelector } from 'react-redux';
import { changeParentForDepartments } from '@Actions/department.action';
import { ResultDrop } from '../../../../UiKitComponents/Table/Table.type';
import { Table } from '@UiKitComponents';

interface ListDepartmentProps {}

const columnsDepartmentTable: ColumnsTable<IDepartmentTable>[] = [
  {
    dataKey: 'departmentCode',
    headerTitle: 'DEPARTMENT CODE',

    sortable: true,
  },
  {
    dataKey: 'name',
    headerTitle: 'DEPARTMENT NAME',

    sortable: true,
  },
  {
    dataKey: 'parentName',
    headerTitle: 'PARENT DEPARTMENT',
  },
  {
    dataKey: 'siteName',
    headerTitle: 'LOCATION',

    sortable: true,
  },
];

const getDepartmentState = (state: RootState) => state.DepartmentReducer;

const ListDepartment: React.FC<ListDepartmentProps> = () => {
  const { departmentList, loadingDepartment } = useSelector(getDepartmentState);
  const dispatch = useDispatch();

  const handleData = (departments: Department[]) => {
    return departments.map((department): IDepartmentTable => {
      const parentName = department.parentDepartment ? department.parentDepartment.name : '';
      return {
        name: department.name,
        departmentCode: department.departmentCode,
        parentName: parentName,
        siteName: department.site.name,
        departmentId: department.departmentId,
        children: handleData(department.childDepartment),
      };
    });
  };
  const memoizedData = useMemo(() => handleData(departmentList), [departmentList]);
  const memoizedColumns = useMemo(() => columnsDepartmentTable, []);

  const changeParentIds = useCallback((result: ResultDrop<IDepartmentTable>) => {
    const { drag, drop } = result;
    dispatch(changeParentForDepartments(drag, drop));
  }, []);

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

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions
          pageCreatingUrl="/Departments/newDepartment"
          textRedirectButton="New Department"
        />
        <Table
          type={'complex'}
          data={memoizedData}
          rowKey={'departmentId'}
          columnsConfig={memoizedColumns}
          dropAction={changeParentIds}
        />
      </div>
    </div>
  );
};

export default ListDepartment;
