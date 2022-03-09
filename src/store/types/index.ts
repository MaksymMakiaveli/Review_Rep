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

export type ResponseApi<T> = {
  resultObject: T;
  resultStatus: boolean;
};

export interface BaseAction<Type> {
  type: Type;
  api?: AxiosRequestConfig;
  apiKey?: true | string;
  redirect?: Redirect;
  data?: any;
}

export interface ResponseAsetlyApi<TypeResultObject> {
  resultObject: TypeResultObject;
  resultStatus: boolean;
  languageKeyword?: string;
}
