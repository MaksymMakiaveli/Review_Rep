import React, { useMemo } from 'react';

import { TableHeaderActions } from '@components';
import { RootState } from '@RootStateType';
import { ColumnsTable } from '@Types/application.types';
import { TCompanyTable } from '@Types/company.types';
import { Table } from '@UiKitComponents';
import { useSelector } from 'react-redux';

const columnsCompany: ColumnsTable<TCompanyTable>[] = [
  { dataKey: 'companyId', headerTitle: 'OneCompany Id', sortable: true },
  { dataKey: 'name', headerTitle: 'OneCompany Name', sortable: true },
  { dataKey: 'companyCode', headerTitle: 'OneCompany Code' },
  { dataKey: 'address', headerTitle: 'Address', sortable: true },
];

const getCompanyState = (state: RootState) => state.CompanyReducer;

const ListCompany = () => {
  const { companyList } = useSelector(getCompanyState);

  const memoizedData = useMemo(
    () =>
      companyList.map(
        (company): TCompanyTable => ({
          address: company.address,
          companyCode: company.companyCode,
          companyId: company.companyId,
          name: company.name,
        })
      ),
    [companyList]
  );

  const memoizedColumns = useMemo(() => columnsCompany, []);

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions pageCreatingUrl="CreateCompany" textRedirectButton="New Company" />
        <Table
          type={'simple'}
          data={memoizedData}
          columnsConfig={memoizedColumns}
          rowKey={'companyId'}
        />
      </div>
    </div>
  );
};

export default ListCompany;
