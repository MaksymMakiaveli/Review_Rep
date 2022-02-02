import { CostCenterActions, TCreateContract } from '@Types/costCenters.type';
import { GET_COST_CENTERS_LIST, POST_NEW_COST_CENTER } from '../actionTypes';

export const getCostCentersList = (): CostCenterActions => ({
  type: GET_COST_CENTERS_LIST,
  api: {
    url: '/CostCenter/GetCostCenterList',
    method: 'GET',
  },
});

export const postNewCostCenter = (costCenter: TCreateContract): CostCenterActions => ({
  type: POST_NEW_COST_CENTER,
  api: {
    url: '/CostCenter/AddCostCenter',
    method: 'POST',
    data: costCenter,
  },
});
