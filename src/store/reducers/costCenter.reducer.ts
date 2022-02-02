import { CostCenterActions, CostCenterState } from '@Types/costCenters.type';
import { GET_COST_CENTERS_LIST, SUCCESS } from '../actionTypes';
import { concatActions } from '@helpers/functions';

const initialState: CostCenterState = {
  costCentersList: [],
  currentCostCenter: null,
  loadingCostCenter: false,
};

export const CostCenterReducer = (
  state = initialState,
  action: CostCenterActions
): CostCenterState => {
  switch (action.type) {
    case GET_COST_CENTERS_LIST:
      return {
        ...state,
        loadingCostCenter: true,
      };
    case concatActions(GET_COST_CENTERS_LIST, SUCCESS):
      return {
        ...state,
        costCentersList: [...state.costCentersList, ...action.response.resultObject],
        loadingCostCenter: false,
      };
    default:
      return {
        ...state,
      };
  }
};
