import { useCallback, useEffect, useState } from 'react';
import { DataType } from '@Types/application.types';

type OptionsType = {
  sortColumn?: string;
  sortType?: 'desc' | 'asc';
};

function useSortColumn<T extends DataType<T>>(
  sortColumn: string | undefined,
  sortType: 'asc' | 'desc' | undefined,
  data: T[]
): () => T[] {
  return (): T[] => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x =
          typeof (a as any)[sortColumn] === 'string'
            ? (a as any)[sortColumn].toString()
              ? typeof (a as any)[sortColumn] === 'number'
              : (a as any)[sortColumn]
            : '';
        let y =
          typeof (b as any)[sortColumn] === 'string'
            ? (b as any)[sortColumn].toString()
              ? typeof (b as any)[sortColumn] === 'number'
              : (b as any)[sortColumn]
            : '';

        if (sortType === 'asc') {
          if (typeof x === 'string' && typeof y === 'string') {
            return y.localeCompare(x);
          } else {
            return x - y;
          }
        } else {
          if (typeof x === 'string' && typeof y === 'string') {
            return x.localeCompare(y);
          } else {
            return y - x;
          }
        }
      });
    }
    return data;
  };
}

function useDataForTable<T extends DataType<T>>(
  data: T[]
): [
  data: T[],
  optionSort: OptionsType,
  handleSort: (sortColumn: string, sortType?: 'desc' | 'asc') => void
] {
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortType, setSortType] = useState<'desc' | 'asc' | undefined>();
  const sortData = useSortColumn(sortColumn, sortType, data);
  const [state, setState] = useState(data);

  const handleSort = useCallback(
    (sortColumn: string, sortType?: 'desc' | 'asc') => {
      setSortColumn(sortColumn);
      setSortType(sortType);
    },
    [sortColumn, sortType]
  );
  useEffect(() => {
    setState(sortData());
  }, [sortColumn, sortType]);
  const optionSort = {
    sortColumn,
    sortType,
  };
  return [state, optionSort, handleSort];
}
export default useDataForTable;
