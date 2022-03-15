import { AxiosRequestConfig } from 'axios';

export type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`;

export type Api<Data = undefined> = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  data?: Data;
  params?: {};
};

export type Redirect = {
  path: string;
};

export type ShowToaster = {
  description: string;
  type: 'success' | 'info' | 'warn' | 'error';
};

export type ResponseApi<T> = {
  resultObject: T;
  resultStatus: boolean;
};

export interface BaseAction<Type> {
  type: Type;
  api?: AxiosRequestConfig;
  redirect?: Redirect;
  showToaster?: ShowToaster;
  data?: any;
  functions?: Array<() => void>;
}

export interface ResponseAsetlyApi<TypeResultObject> {
  resultObject: TypeResultObject;
  resultStatus: boolean;
  languageKeyword: string;
}
