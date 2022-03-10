import { BaseAction, Concat, ResponseAsetlyApi } from '@Types/index';

import {
  DELETE_COST_CENTER,
  GET_COST_CENTERS_LIST,
  GET_ONE_COST_CENTER,
  POST_NEW_COST_CENTER,
  SUCCESS,
  UPDATE_COST_CENTER,
} from '../actionTypes';

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

export type TCostCenterTable = Required<
  Pick<CostCenter, 'costCenterId' | 'costCenterCode' | 'name'>
>;

export interface CostCenterState {
  costCentersList: CostCenter[];
  currentCostCenter: CostCenter | null;
  loadingCostCenter: boolean;
}

export type TCreateCostCenter = {
  costCenterCode: string;
  name: string;
};

export type TUpdateCostCenter = TCreateCostCenter & Pick<CostCenter, 'costCenterId'>;

export type TFormCreateCostCenter = TCreateCostCenter;

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
export interface GetOneCostCenter extends BaseAction<typeof GET_ONE_COST_CENTER> {}
export interface GetOneCostCenterSuccess
  extends BaseAction<Concat<typeof GET_ONE_COST_CENTER, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CostCenter>;
}

export interface DeleteCostCenter extends BaseAction<typeof DELETE_COST_CENTER> {}
export interface DeleteCostCenterSuccess
  extends BaseAction<Concat<typeof DELETE_COST_CENTER, typeof SUCCESS>> {
  data: { costCenterIds: number[] };
}

export interface UpdateCostCenter extends BaseAction<typeof UPDATE_COST_CENTER> {}
export interface UpdateCostCenterSuccess
  extends BaseAction<Concat<typeof UPDATE_COST_CENTER, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CostCenter>;
}

export type CostCenterActions =
  | GetCostCentersList
  | GetCostCentersListSuccess
  | PostNewCostCenter
  | PostNewCostCenterSuccess
  | GetOneCostCenter
  | GetOneCostCenterSuccess
  | DeleteCostCenter
  | DeleteCostCenterSuccess
  | UpdateCostCenter
  | UpdateCostCenterSuccess;
