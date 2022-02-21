import React, { useMemo, useState } from 'react';
import { PaginationProps } from 'semantic-ui-react/dist/commonjs/addons/Pagination/Pagination';

type HookReturn<T extends object> = {
  filteredData: T[];
  totalPages: number;
  changePage: (
    event: React.MouseEvent<HTMLAnchorElement>,
    paginationProps: PaginationProps
  ) => void;
};

function usePagination<T extends object>(data: T[], limitPage = 10): HookReturn<T> {
  const [limit] = useState(limitPage);
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.ceil(data.length / limit);

  const filteredData = useMemo(
    () =>
      data.filter((item, index) => {
        const start = limit * (activePage - 1);
        const end = start + limitPage;
        return index >= start && index < end;
      }),
    [activePage, data]
  );

  const changePage = (
    event: React.MouseEvent<HTMLAnchorElement>,
    paginationProps: PaginationProps
  ) => {
    if (paginationProps.activePage && typeof paginationProps.activePage === 'number') {
      setActivePage(paginationProps.activePage);
    }
  };

  return {
    filteredData,
    totalPages,
    changePage,
  };
}

export default usePagination;
