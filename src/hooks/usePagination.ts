import { useMemo, useState } from 'react';

type HookReturn<T = any> = {
  filteredData: T[];
  totalPages: number;
  activePage: number;
  limit: number;
  changePage: (page: number) => void;
};

function usePagination<T>(data: T[], limitPage: number = 10): HookReturn<T> {
  const [activePage, setActivePage] = useState(1);

  const totalPages = data.length;

  const filteredData = data.filter((item, index) => {
    const start = limitPage * (activePage - 1);
    const end = start + limitPage;
    return index >= start && index < end;
  });

  const memoizedData = useMemo(() => filteredData, [activePage, data]);

  return {
    filteredData: memoizedData,
    totalPages,
    changePage: setActivePage,
    activePage,
    limit: limitPage,
  };
}

export default usePagination;
