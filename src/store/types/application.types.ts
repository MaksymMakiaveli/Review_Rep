import { BaseAction, Concat } from './index';
import { FAIL, GET_TOKEN, SUCCESS } from '../actionTypes';

export type PageMode = 'EDIT' | 'REVIEW' | null;

export type DataKeyType<Type extends object = {}> = {
  label: string;
  key: string;
  // TODO: Нужно почистить типы
  mustDeleteKey?: keyof Type;
  align?: 'center' | 'right' | 'left';
  flexGrow?: number;
  width?: number;
  sortable?: boolean;
};

export interface DataTableType {
  [key: string]: any;
}

export interface ColumnsTable<Object extends DataTableType> {
  title: string;
  dataKey: keyof Object;
}

export type TSelectValue<ValueType extends number | string> = {
  label: string;
  value: ValueType;
};

export type MappedObjectType<Type> = {
  [Property in keyof Type]: Type[Property];
};

export type DataType<T> = MappedObjectType<T> & {
  isSelected: boolean;
};

export type UnknownDataType = {
  [key: string]: any;
};

export type ErrorType = {
  [key: string]: string;
};

export interface ApplicationState {
  token: string;
  error: string | null;
}
export interface GetToken extends BaseAction<typeof GET_TOKEN> {}
export interface GetTokenSuccess extends BaseAction<Concat<typeof GET_TOKEN, typeof SUCCESS>> {
  response: {
    [key: string]: string | null;
    token: string;
  };
}

export interface GetTokenFail extends BaseAction<Concat<typeof GET_TOKEN, typeof FAIL>> {
  error: {
    [key: string]: any;
    message: string;
  };
}

export type ApplicationActions = GetToken | GetTokenSuccess | GetTokenFail;
