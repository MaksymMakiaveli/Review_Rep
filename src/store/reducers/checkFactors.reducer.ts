import { CheckFactorActions, CheckFactorState } from '@Types/checkFactors.type';
import { GET_CHECK_FACTORS_LIST, SUCCESS } from '../actionTypes';
import { concatActions } from '@helpers/functions';

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
    default:
      return {
        ...state,
      };
  }
};
