import React, { useMemo } from 'react';

import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { RootState } from '@RootStateType';
import { ColumnsTable } from '@Types/application.types';
import { TCompanyTable } from '@Types/company.types';
import { Table } from '@UiKitComponents';
import { useSelector } from 'react-redux';

const columnsCompany: ColumnsTable<TCompanyTable>[] = [
  { dataKey: 'companyId', title: 'Company Id', isSorted: true },
  { dataKey: 'name', title: 'Company Name', isSorted: true },
  { dataKey: 'companyCode', title: 'Company Code' },
  { dataKey: 'address', title: 'Address', isSorted: true },
];

const getCompanyState = (state: RootState) => state.CompanyReducer;

const ListCompany = () => {
  const { companyList, loadingCompany } = useSelector(getCompanyState);

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

  if (loadingCompany) {
    return <Loader />;
  }

  if (companyList && !companyList.length) {
    return (
      <EmptyPage textButton="Company" redirectPath="newCompany">
        <h5>You don`t have companies yet</h5>
        <h5>Click the button and create a new company</h5>
      </EmptyPage>
    );
  }

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions
          pageCreatingUrl="/Companies/newCompany"
          textRedirectButton="New Company"
        />
        <Table data={memoizedData} columnsConfig={memoizedColumns} keyTable="companyId" />
      </div>
    </div>
  );
};

export default ListCompany;
