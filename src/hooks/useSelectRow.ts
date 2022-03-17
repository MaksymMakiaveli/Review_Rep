import { useCallback, useState } from 'react';

interface HookReturn<T = any> {
  selectedRows: T[];
  handlingSelectRow: (item: T, checked: boolean) => void;
  clearSelectedRows: () => void;
}

interface HookProps<T = any, K = keyof T> {
  rowKey: K extends string ? K : never;
}

function useSelectRow<T>(props: HookProps<T>): HookReturn<T> {
  const { rowKey } = props;
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handlingSelectRow = useCallback(
    (item: T, checked: boolean) => {
      const items = checked
        ? [...selectedRows, item]
        : selectedRows.filter((selectedItem) => selectedItem[rowKey] !== item[rowKey]);
      setSelectedRows(items);
    },
    [selectedRows]
  );

  const clearSelectedRows = useCallback(() => {
    setSelectedRows([]);
  }, []);

  return {
    selectedRows,
    handlingSelectRow,
    clearSelectedRows,
  };
}
export default useSelectRow;
