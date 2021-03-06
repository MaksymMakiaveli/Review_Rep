import React, { useMemo } from 'react';

import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { RootState } from '@RootStateType';
import { ColumnsTable } from '@Types/application.types';
import { TVendorTable } from '@Types/vendor.types';
import { Table } from '@UiKitComponents';
import { useSelector } from 'react-redux';

interface VendorListProps {}

const columnsVendorTable: ColumnsTable<TVendorTable>[] = [
  {
    dataKey: 'name',
    headerTitle: 'Vendor Name',
    sortable: true,
  },
  {
    dataKey: 'taxNumber',
    headerTitle: 'TXN',
  },
  {
    dataKey: 'phone',
    headerTitle: 'Phone',
  },
  {
    dataKey: 'cityName',
    headerTitle: 'CITY',
    sortable: true,
  },
];

const getVendorState = (state: RootState) => state.VendorReducer;

const VendorList: React.FC<VendorListProps> = () => {
  const { vendorList, loadingVendor } = useSelector(getVendorState);

  const memoizedData = useMemo(
    () =>
      vendorList.map((vendor): TVendorTable => {
        const cityName = vendor.city ? vendor.city.name : '';
        return {
          name: vendor.name,
          cityName: cityName,
          phone: vendor.phone,
          taxNumber: vendor.taxNumber,
          partnerId: vendor.partnerId,
        };
      }),
    [vendorList]
  );
  const memoizedColumns = useMemo(() => columnsVendorTable, []);

  if (loadingVendor) {
    return <Loader />;
  }
  if (vendorList && !vendorList.length) {
    return (
      <EmptyPage textButton="Vendor" redirectPath="newVendor">
        <h5>You don`t have vendors yet</h5>
        <h5>Click the button and create a new vendor</h5>
      </EmptyPage>
    );
  }

  return (
    <div className="padding_wrapper_table-page">
      <TableHeaderActions pageCreatingUrl="/Vendors/newVendor" textRedirectButton="New Vendor" />
      <Table
        type={'simple'}
        data={memoizedData}
        rowKey={'partnerId'}
        columnsConfig={memoizedColumns}
      />
    </div>
  );
};

export default VendorList;
