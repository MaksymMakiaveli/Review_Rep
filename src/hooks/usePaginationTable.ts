import { useEffect, useState } from 'react';

type LayoutType = 'total' | '-' | 'pager' | '|' | 'limit' | 'skip';
type Setting = {
  prev: boolean;
  next: boolean;
  boundaryLinks: boolean;
  maxButtons: number;
  size: 'lg' | 'md' | 'sm' | 'xs';
  layout: LayoutType[];
  total: number;
  limit: number;
  activePage: number;
  onChangePage: (page: number) => void;
};

const usePaginationTable = (dataLength: number): Setting => {
  const [activePage, setActivePage] = useState(1);
  const [state, setState] = useState<Setting>({
    prev: true,
    next: true,
    boundaryLinks: true,
    maxButtons: 2,
    size: 'sm',
    layout: ['pager'],
    total: dataLength,
    limit: 10,
    activePage: activePage,
    onChangePage: setActivePage,
  });

  useEffect(() => {
    setState({ ...state, activePage: activePage });
  }, [activePage]);

  return state;
};

export default usePaginationTable;
