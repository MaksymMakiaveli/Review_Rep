import { ColumnsTableRS } from '@Types/application.types';
import { RowDataType } from 'rsuite-table/src/@types/common';
import { ReactNode } from 'react';

export interface BasicTableProps<T = any, K = keyof T> {
  data: T[];
  columnsConfig: ColumnsTableRS<T>[];
  rowKey: K extends string ? K : never;
}

export interface ISimple<T = any> extends BasicTableProps<T> {}
export interface IDraggable<T = any> extends BasicTableProps<T> {
  isDraggable: boolean;
}
export interface ITree<T = any, K = keyof T> extends BasicTableProps<T> {
  isTree: boolean;
  keyForParentId: K extends string ? K : never;
}
export interface IComplex<T = any, K = keyof T> extends BasicTableProps<T> {
  isDraggable: boolean;
  isTree: boolean;
  keyForParentId: K extends string ? K : never;
}

export interface SimpleTable<T = any> extends ISimple<T> {
  type: 'simple';
}
export interface DraggableTable<T = any> extends IDraggable<T> {
  type: 'draggable';
}
export interface TreeTable<T = any> extends ITree<T> {
  type: 'tree';
}
export interface ComplexTable<T = any> extends IComplex<T> {
  type: 'complex';
}

export type TableProps<T = any> =
  | ComplexTable<T>
  | SimpleTable<T>
  | TreeTable<T>
  | DraggableTable<T>;

export interface DefaultProps {
  rowData?: RowDataType;
  dataKey: string;
}

export interface RowProps<T = any> extends Required<DefaultProps> {
  children: ReactNode;
  selectedRows?: T[];
  isDraggable?: boolean;
  onDropRow?: (value: any) => void;
  handlingSelectedRows?: (item: T, checked: boolean) => void;
  clearSelectedRows?: () => void;
}

export interface CheckCellProps<T = any> extends DefaultProps {
  selectedRows: T[];
  onChange: (item: T, checked: boolean) => void;
}

export interface CustomCellProps extends DefaultProps {
  rowKey?: number;
}

export interface ReducerState<T = any> {
  data: T[];
  column: string;
  direction: 'asc' | 'desc' | undefined;
}

export interface ReducerAction {
  type: 'CHANGE_SORT';
  payload: {
    direction: 'asc' | 'desc' | undefined;
    column: string;
  };
}
