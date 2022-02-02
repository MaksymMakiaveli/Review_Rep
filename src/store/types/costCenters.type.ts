import { BaseAction, Concat, ResponseAsetlyApi } from '@Types/index';
import { GET_COST_CENTERS_LIST, POST_NEW_COST_CENTER, SUCCESS } from '../actionTypes';

export type CostCenter = {
  costCenterId: number;
  companyId: number;
  costCenterCode: string;
  name: string;
  createDate: string;
  creatorId: number;
  isValid: boolean;
  modifiedId: null | number;
  modifiedDate: null | string;
  //TODO: как узнаем тип массива изменить any
  nonCurrAssets: any[];
};

// "costCenterId": 1,
//   "costCenterCode": "string",
//   "companyId": 7,
//   "name": "string",
//   "createdDate": "2022-02-02T10:32:36.9305565+00:00",
//   "creatorId": 3,
//   "modifiedDate": null,
//   "modifiedId": null,
//   "isValid": true,
//   "nonCurrAssets": []

export interface CostCenterState {
  costCentersList: CostCenter[];
  currentCostCenter: CostCenter | null;
  loadingCostCenter: boolean;
}

export type TCreateContract = {
  costCenterCode: string;
  name: string;
};

export type TFormCreateContract = TCreateContract;

export interface GetCostCentersList extends BaseAction<typeof GET_COST_CENTERS_LIST> {}
export interface GetCostCentersListSuccess
  extends BaseAction<Concat<typeof GET_COST_CENTERS_LIST, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CostCenter[]>;
}

export interface PostNewCostCenter extends BaseAction<typeof POST_NEW_COST_CENTER> {}
export interface PostNewCostCenterSuccess
  extends BaseAction<Concat<typeof POST_NEW_COST_CENTER, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CostCenter>;
}

export type CostCenterActions =
  | GetCostCentersList
  | GetCostCentersListSuccess
  | PostNewCostCenter
  | PostNewCostCenterSuccess;
