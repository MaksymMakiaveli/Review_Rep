import { ColumnsTable } from '@Types/application.types';
import { RowDataType } from 'rsuite-table/src/@types/common';
import { ReactNode } from 'react';

export type ResultDrop<T = any> = {
  area: string;
  drag: T[];
  drop: T | 0;
};

export interface BasicTableProps<T = any, K = keyof T> {
  data: T[];
  columnsConfig: ColumnsTable<T>[];
  rowKey: K extends string ? K : never;
}

export interface ISimple<T> extends BasicTableProps<T> {}
export interface IDraggable<T> extends BasicTableProps<T> {
  dropAction: (result: ResultDrop) => void;
}
export interface ITree<T> extends BasicTableProps<T> {}
export interface IComplex<T> extends BasicTableProps<T> {
  dropAction: (result: ResultDrop) => void;
}

export interface SimpleTable<T> extends ISimple<T> {
  type: 'simple';
}
export interface DraggableTable<T> extends IDraggable<T> {
  type: 'draggable';
}
export interface TreeTable<T> extends ITree<T> {
  type: 'tree';
}
export interface ComplexTable<T> extends IComplex<T> {
  type: 'complex';
}

export type TableProps<T> = ComplexTable<T> | SimpleTable<T> | TreeTable<T> | DraggableTable<T>;

export interface DefaultProps {
  rowData?: RowDataType;
  dataKey: string;
}

export interface RowProps<T = any> extends Required<DefaultProps> {
  children: ReactNode;
  selectedRows: BasicTableProps['data'];
  handlingSelectedRows: (item: T, checked: boolean) => void;
  dropAction: (result: ResultDrop) => void;
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
