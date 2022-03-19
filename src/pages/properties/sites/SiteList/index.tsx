import React, { useMemo } from 'react';

import { Loader } from '@common';
import { EmptyPage, TableHeaderActions } from '@components';
import { RootState } from '@RootStateType';
import { ColumnsTable } from '@Types/application.types';
import { TSiteTable } from '@Types/site.types';
import { Table } from '@UiKitComponents';
import { useSelector } from 'react-redux';

interface SiteListProps {}

const columnsSiteTable: ColumnsTable<TSiteTable>[] = [
  {
    dataKey: 'name',
    headerTitle: 'SITE NAME',
    sortable: true,
  },
  {
    dataKey: 'siteCode',
    headerTitle: 'SITE CODE',
    sortable: true,
  },
  {
    dataKey: 'barcode',
    headerTitle: 'SITE BARCODE',
  },
  {
    dataKey: 'countryName',
    headerTitle: 'COUNTRY',
    sortable: true,
  },
  {
    dataKey: 'cityName',
    headerTitle: 'CITY',
    sortable: true,
  },
];

const getSiteState = (state: RootState) => state.SiteReducer;

const SiteList: React.FC<SiteListProps> = () => {
  const { siteList, loadingSite } = useSelector(getSiteState);

  const memoizedData = useMemo(
    () =>
      siteList.map((site): TSiteTable => {
        const cityName = site.city ? site.city.name : '';
        const countryName = site.city ? site.city.country.name : '';
        return {
          name: site.name,
          cityName: cityName,
          countryName: countryName,
          siteCode: site.siteCode,
          barcode: site.barcode,
          siteId: site.siteId,
        };
      }),
    [siteList]
  );
  const memoizedColumns = useMemo(() => columnsSiteTable, []);

  if (loadingSite) {
    return <Loader />;
  }

  if (!siteList.length) {
    return (
      <EmptyPage textButton="Site" redirectPath="newSite">
        <h5>You don`t have site yet</h5>
        <h5>Click the button and create a new site</h5>
      </EmptyPage>
    );
  }

  return (
    <div>
      <div className="padding_wrapper_table-page">
        <TableHeaderActions pageCreatingUrl="/Sites/newSite" textRedirectButton="New Site" />
        <Table
          type={'simple'}
          data={memoizedData}
          columnsConfig={memoizedColumns}
          rowKey={'siteId'}
        />
      </div>
    </div>
  );
};

export default SiteList;
