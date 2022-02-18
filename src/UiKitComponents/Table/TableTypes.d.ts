import { ColumnsTable } from '@Types/application.types';

declare interface TableProps<T extends object = any, Keys = keyof T> {
  data: T[];
  columnsConfig: ColumnsTable<T>[];
  keyTable: Keys extends string ? Keys : never;
  isDraggable?: boolean;
}

declare interface TableCreateContext extends TableProps {}
