import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetVendorList } from '@Actions/vendor.action';
import { TVendorTable } from '@Types/vendor.types';
import { RootState } from '@RootStateType';
import { EmptyPage, TableHeaderActions } from '@components';
import { CustomTable } from '@UiKitComponents';
import { Loader } from '@common';
import { DataKeyType } from '@Types/application.types';

interface VendorListProps {}

const dataKeyVendorList: DataKeyType<TVendorTable>[] = [
  {
    key: 'name',
    label: 'Vendor Name',
    align: 'left',
    flexGrow: 1,
    sortable: true,
  },
  {
    key: 'taxNumber',
    label: 'TXN',
    align: 'left',
    flexGrow: 1,
    sortable: true,
  },
  {
    key: 'phone',
    label: 'Phone',
    align: 'left',
    flexGrow: 1,
  },
  {
    key: 'cityName',
    label: 'CITY',
    align: 'left',
    flexGrow: 1,
    sortable: true,
  },
];

const getVendorState = (state: RootState) => state.VendorReducer;

const VendorList: React.FC<VendorListProps> = () => {
  const { vendorList, loadingVendor } = useSelector(getVendorState);
  const [checkedItemsList, setCheckedItemsList] = useState<number[] | string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!vendorList.length) {
      dispatch(GetVendorList());
    }
  }, [vendorList]);

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

  const listForTable: TVendorTable[] = vendorList.map((vendor) => {
    const cityName = vendor.city ? vendor.city.name : '';
    return {
      name: vendor.name,
      cityName: cityName,
      phone: vendor.phone,
      taxNumber: vendor.taxNumber,
      partnerId: vendor.partnerId,
    };
  });

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions
          checkedItemsList={checkedItemsList}
          pageCreatingUrl="/Vendors/newVendor"
          textRedirectButton="New Vendor"
        />
        <CustomTable
          data={listForTable}
          dataKey={dataKeyVendorList}
          currentDataKey="partnerId"
          setCheckedItemsList={setCheckedItemsList}
        />
      </div>
    </div>
  );
};

export default VendorList;
