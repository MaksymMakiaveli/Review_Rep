import { concatActions } from '@helpers/functions';
import { CheckFactorActions, CheckFactorState } from '@Types/checkFactors.type';

import {
  DELETE_CHECK_FACTORY,
  GET_CHECK_FACTORS_LIST,
  GET_ONE_CHECK_FACTORY,
  POST_NEW_CHECK_FACTOR,
  SUCCESS,
} from '../actionTypes';

const initialState: CheckFactorState = {
  checkFactorList: [],
  currentCheckFactor: null,
  loadingCheckFactor: false,
};

export const CheckFactorReducer = (
  state = initialState,
  action: CheckFactorActions
): CheckFactorState => {
  switch (action.type) {
    case GET_CHECK_FACTORS_LIST:
      return {
        ...state,
        loadingCheckFactor: true,
      };
    case concatActions(GET_CHECK_FACTORS_LIST, SUCCESS):
      return {
        ...state,
        checkFactorList: action.response.resultObject,
        loadingCheckFactor: false,
      };
    case POST_NEW_CHECK_FACTOR:
      return {
        ...state,
        loadingCheckFactor: true,
      };
    case concatActions(POST_NEW_CHECK_FACTOR, SUCCESS):
      return {
        ...state,
        checkFactorList: [...state.checkFactorList, action.response.resultObject],
        loadingCheckFactor: false,
      };
    case GET_ONE_CHECK_FACTORY:
      return {
        ...state,
        loadingCheckFactor: true,
      };
    case concatActions(GET_ONE_CHECK_FACTORY, SUCCESS):
      return {
        ...state,
        currentCheckFactor: action.response.resultObject,
        loadingCheckFactor: false,
      };
    case DELETE_CHECK_FACTORY:
      return {
        ...state,
        loadingCheckFactor: true,
      };
    case concatActions(DELETE_CHECK_FACTORY, SUCCESS):
      const newCheckFactorList = state.checkFactorList.filter(
        (checkFactor) => !action.data.checkFactorId.includes(checkFactor.checkFactorId)
      );
      return {
        ...state,
        checkFactorList: newCheckFactorList,
        loadingCheckFactor: false,
      };
    default:
      return {
        ...state,
      };
  }
};
