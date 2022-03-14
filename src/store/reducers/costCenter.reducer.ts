import { concatActions, filteringByRemovedId } from '@helpers/functions';
import { CostCenterActions, CostCenterState } from '@Types/costCenters.type';

import {
  DELETE_COST_CENTER,
  GET_COST_CENTERS_LIST,
  GET_ONE_COST_CENTER,
  POST_NEW_COST_CENTER,
  SUCCESS,
  UPDATE_COST_CENTER,
} from '../actionTypes';

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
        costCentersList: action.response.resultObject,
        loadingCostCenter: false,
      };
    case POST_NEW_COST_CENTER:
      return {
        ...state,
        loadingCostCenter: true,
      };
    case concatActions(POST_NEW_COST_CENTER, SUCCESS):
      return {
        ...state,
        costCentersList: [...state.costCentersList, action.response.resultObject],
        loadingCostCenter: false,
      };
    case GET_ONE_COST_CENTER:
      return {
        ...state,
        loadingCostCenter: true,
      };
    case concatActions(GET_ONE_COST_CENTER, SUCCESS):
      return {
        ...state,
        currentCostCenter: action.response.resultObject,
        loadingCostCenter: false,
      };
    case DELETE_COST_CENTER:
      return {
        ...state,
        loadingCostCenter: true,
      };
    case concatActions(DELETE_COST_CENTER, SUCCESS):
      const list = state.costCentersList;
      const ids = action.data.costCenterIds;
      const newCostCenterList = filteringByRemovedId(list, ids, 'costCenterId');
      return {
        ...state,
        costCentersList: newCostCenterList,
        loadingCostCenter: false,
      };
    case UPDATE_COST_CENTER:
      return {
        ...state,
        loadingCostCenter: true,
      };
    case concatActions(UPDATE_COST_CENTER, SUCCESS):
      return {
        ...state,
        currentCostCenter: action.response.resultObject,
        costCentersList: state.costCentersList.map((costCenter) =>
          costCenter.costCenterId === action.response.resultObject.costCenterId
            ? action.response.resultObject
            : costCenter
        ),
        loadingCostCenter: false,
      };
    default:
      return {
        ...state,
      };
  }
};
