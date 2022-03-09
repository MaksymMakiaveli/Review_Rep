import { ColumnsTable } from '@Types/application.types';

export type ResultDrop<T extends object> = {
  draggingItem: T[];
  focusItem: T;
  dropEffect: string;
};

export interface TableProps<T extends object = any, Keys = keyof T> {
  data: T[];
  columnsConfig: ColumnsTable<T>[];
  keyTable: Keys extends string ? Keys : never;
  isDraggable?: boolean;
  actionForDrag?: (resultDrop: ResultDrop<T>) => void;
}

export interface TableCreateContext extends TableProps {}
