import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TVendorTable } from '@Types/vendor.types';
import { RootState } from '@RootStateType';
import { EmptyPage, TableHeaderActions } from '@components';
import { Table } from '@UiKitComponents';
import { Loader } from '@common';
import { ColumnsTable } from '@Types/application.types';

interface VendorListProps {}

const columnsVendorTable: ColumnsTable<TVendorTable>[] = [
  {
    dataKey: 'name',
    title: 'Vendor Name',
    isSorted: true,
  },
  {
    dataKey: 'taxNumber',
    title: 'TXN',
  },
  {
    dataKey: 'phone',
    title: 'Phone',
  },
  {
    dataKey: 'cityName',
    title: 'CITY',
    isSorted: true,
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
      <Table data={memoizedData} columnsConfig={memoizedColumns} keyTable="partnerId" />
    </div>
  );
};

export default VendorList;
