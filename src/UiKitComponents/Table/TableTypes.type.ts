import { ColumnsTable } from '@Types/application.types';

export interface TableProps<T extends object = any, Keys = keyof T> {
  data: T[];
  columnsConfig: ColumnsTable<T>[];
  keyTable: Keys extends string ? Keys : never;
  isDraggable?: boolean;
}

export interface TableCreateContext extends TableProps {}
