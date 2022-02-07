import { useState } from 'react';
import { UnknownDataType } from '@Types/application.types';

type OptionsType = {
  loading: boolean;
  sortColumn?: string;
  sortType?: 'desc' | 'asc';
};

const useSortDataTable = (
  data: UnknownDataType[]
): [
  sortedData: UnknownDataType,
  options: OptionsType,
  handleSortColumn: (sortColumn: string, sortType?: 'desc' | 'asc') => void
] => {
  const [sortedData, setSortedData] = useState<UnknownDataType[]>(data);
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortType, setSortType] = useState<'desc' | 'asc' | undefined>();
  const [loading, setLoading] = useState(false);

  const sortColumns = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x: string = a[sortColumn] ? a[sortColumn].toString() : '';
        let y: string = b[sortColumn] ? b[sortColumn].toString() : '';

        if (sortType === 'asc') {
          return y.localeCompare(x);
        } else {
          return x.localeCompare(y);
        }
      });
    }
    return data;
  };
  const handleSortColumn = (sortColumn: string, sortType?: 'desc' | 'asc') => {
    setLoading(true);
    setSortColumn(sortColumn);
    setSortType(sortType);
    setSortedData(sortColumns());
    setLoading(false);
  };

  const options = {
    loading,
    sortColumn,
    sortType,
  };
  return [sortedData, options, handleSortColumn];
};

export default useSortDataTable;
