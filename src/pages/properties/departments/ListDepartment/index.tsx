import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TDepartmentTable } from '@Types/department.types';
import { RootState } from '@RootStateType';
import { EmptyPage, TableHeaderActions } from '@components';
import { Table } from '@UiKitComponents';
import { Loader } from '@common';
import { ColumnsTable } from '@Types/application.types';

interface ListDepartmentProps {}

const columnsDepartmentTable: ColumnsTable<TDepartmentTable>[] = [
  {
    dataKey: 'departmentCode',
    title: 'DEPARTMENT CODE',
    isSorted: true,
  },
  {
    dataKey: 'name',
    title: 'DEPARTMENT NAME',
    isSorted: true,
  },
  {
    dataKey: 'parentName',
    title: 'PARENT DEPARTMENT',
  },
  {
    dataKey: 'siteName',
    title: 'LOCATION',
    isSorted: true,
  },
];

const getDepartmentState = (state: RootState) => state.DepartmentReducer;

const ListDepartment: React.FC<ListDepartmentProps> = () => {
  const { departmentList, loadingDepartment } = useSelector(getDepartmentState);
  
  const memoizedData = useMemo(
    () =>
    departmentList.map((department): TDepartmentTable => {
        const parentName = department.parentDepartment ? department.parentDepartment.name : '';
        const siteName = department.site ? department.site.name : '';
        
        return {
          name: department.name,
          departmentCode: department.departmentCode,
          parentName: parentName,
          siteName: siteName,
          departmentId: department.departmentId,
        };
      }),
    [departmentList]
  );
  const memoizedColumns = useMemo(() => columnsDepartmentTable, []);
  
  if (loadingDepartment) {
    return <Loader />;
  }

  if (departmentList && !departmentList.length) {
    return (
      <EmptyPage textButton="Department" redirectPath="newDepartment">
        <h5>You don`t have departmens yet</h5>
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
          data={memoizedData}
          columnsConfig={memoizedColumns}
          keyTable="departmentId"
          isDraggable
        />
      </div>
    </div>
  );
};

export default ListDepartment;