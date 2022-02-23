import { CheckFactorActions, TCreateCheckFactor } from '@Types/checkFactors.type';
import {
  DELETE_CHECK_FACTORY,
  GET_CHECK_FACTORS_LIST,
  GET_ONE_CHECK_FACTORY,
  POST_NEW_CHECK_FACTOR,
} from '../actionTypes';

export const getCheckFactorsList = (): CheckFactorActions => ({
  type: GET_CHECK_FACTORS_LIST,
  api: {
    url: '/CheckFactors/GetCheckFactorsList',
    method: 'GET',
  },
});

export const postNewCheckFactor = (checkFactor: TCreateCheckFactor): CheckFactorActions => ({
  type: POST_NEW_CHECK_FACTOR,
  api: {
    url: '/CheckFactors/AddCheckFactors',
    method: 'POST',
    data: checkFactor,
  },
  redirect: {
    path: '/Others/CheckFactors',
  },
});
export const getOneCheckFactory = (checkFactoryId: string): CheckFactorActions => ({
  type: GET_ONE_CHECK_FACTORY,
  api: {
    url: `/CheckFactors/GetSuspendedById/${checkFactoryId}`,
    method: 'GET',
  },
});

export const deleteCheckFactoryById = (checkFactorIds: {
  checkFactorIds: number[];
}): CheckFactorActions => ({
  type: DELETE_CHECK_FACTORY,
  api: {
    url: '/CheckFactors/RemoveByIdList',
    method: 'POST',
    data: checkFactorIds,
  },
  data: checkFactorIds,
  redirect: {
    path: '/Others/CheckFactors',
  },
});
