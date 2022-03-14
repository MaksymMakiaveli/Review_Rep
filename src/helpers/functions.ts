import axios, { AxiosError } from 'axios';
import { ErrorFromApi } from '@Types/application.types';
import { toast } from 'react-toastify';

export const concatActions = <S1 extends string, S2 extends string>(s1: S1, s2: S2) =>
  (s1 + s2) as `${S1}${S2}`;

export const returnLanguageKeyword = (keyword: string): string => {
  return keyword.split('_').join(' ');
};

export const handleErrorFromApi = (error: AxiosError | Error): ErrorFromApi | string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  } else {
    return error.message;
  }
};

export const handleErrorAndShowToast = (error: AxiosError | Error) => {
  const err = handleErrorFromApi(error);
  if (typeof err === 'string') {
    toast.error(err);
  } else {
    if (err.errors) {
      const errors = err.errors;
      for (const item in errors) {
        toast.error(`${item}: ${errors[item][0]}`);
      }
      return;
    }
    toast.error(err.title);
  }
};

export const filteringByRemovedId = <T = any>(
  processedArray: T[],
  idsArray: number[],
  keyForId: string
) => {
  return processedArray.filter((item) => !idsArray.includes((item as any)[keyForId]));
};

export function mappedAfterUpdate<T = any>(
  processedArray: T[],
  updatedObject: T,
  keyForId: string
) {
  return processedArray.map((item) =>
    (item as any)[keyForId] === (updatedObject as any)[keyForId] ? updatedObject : item
  );
}
