import { CheckFactorActions } from '@Types/CheckFactors.type';
import { GET_CHECK_FACTORS_LIST } from '../actionTypes';

export const getCheckFactorsList = (): CheckFactorActions => ({
  type: GET_CHECK_FACTORS_LIST,
  api: {
    url: '/CheckFactors/GetCheckFactorsList',
    method: 'GET',
  },
});
