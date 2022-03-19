import { FAIL, GET_TOKEN, SUCCESS } from '../actionTypes';
import { BaseAction, Concat } from './index';

export type PageMode = 'EDIT' | 'REVIEW' | null;

export interface ErrorFromApi {
  errors: {
    [key: string]: any;
  };
  status: number;
  title: string;
  traceId: string;
  type: string;
}

export interface ObjectKeysString {
  [key: string]: any;
}

export interface ColumnsTable<T = any, K = keyof T extends string ? keyof T : string> {
  dataKey: K;
  headerTitle: string;
  flexGrow?: number;
  sortable?: boolean;
}

export type TSelectValue<ValueType extends number | string> = {
  label: string;
  value: ValueType;
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
