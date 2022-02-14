import { useCallback, useState } from 'react';

type HookReturn = [number[], (value?: number | string, checked?: boolean) => void];

const useSelectKeysTable = (): HookReturn => {
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);

  const handleCheckbox = useCallback(
    (value?: number | string, checked?: boolean) => {
      const keys = checked
        ? [...selectedKeys, value]
        : selectedKeys.filter((checkbox) => checkbox !== value);
      setSelectedKeys(keys as number[]);
    },
    [selectedKeys]
  );

  return [selectedKeys, handleCheckbox];
};

export default useSelectKeysTable;
