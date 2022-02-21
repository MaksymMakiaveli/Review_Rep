import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TSiteTable } from '@Types/site.types';
import { RootState } from '@RootStateType';
import { EmptyPage, TableHeaderActions } from '@components';
import { Table } from '@UiKitComponents';
import { Loader } from '@common';
import { ColumnsTable } from '@Types/application.types';

interface SiteListProps {}

const columnsSiteTable: ColumnsTable<TSiteTable>[] = [
  {
    dataKey: 'name',
    title: 'SITE NAME',
    // align: 'left',
    // flexGrow: 1,
    isSorted: true,
  },
  {
    dataKey: 'siteCode',
    title: 'SITE CODE',
    // align: 'left',
    // flexGrow: 1,
    isSorted: true,
  },
  {
    dataKey: 'barcode',
    title: 'SITE BARCODE',
    // align: 'left',
    // flexGrow: 1,
  },
  {
    dataKey: 'countryName',
    title: 'COUNTRY',
    // align: 'left',
    // flexGrow: 1,
    isSorted: true,
  },
  {
    dataKey: 'cityName',
    title: 'CITY',
    // align: 'left',
    // flexGrow: 1,
    isSorted: true,
  },
];

const getSiteState = (state: RootState) => state.SiteReducer;

const SiteList: React.FC<SiteListProps> = () => {
  const { siteList, loadingSite } = useSelector(getSiteState);

  const memoizedData = useMemo(
    () =>
    siteList.map((site): TSiteTable => {
        const cityName = site.city ? site.city.name : '';
        const countryName = site.city.country ? site.city.country.name : '';
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
  
  if (siteList && !siteList.length) {
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
        <TableHeaderActions
          pageCreatingUrl="/Locations/newLocation"
          textRedirectButton="New Site"
        />
        <Table
          data={memoizedData}
          columnsConfig={memoizedColumns}
          keyTable="siteId"
          isDraggable
        />
      </div>
    </div>
  );
};

export default SiteList;