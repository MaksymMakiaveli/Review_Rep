import { BaseAction, Concat, ResponseAsetlyApi } from '@Types/index';
import { GET_CHECK_FACTORS_LIST, SUCCESS } from '../actionTypes';

export type CheckFactors = {
  checkFactorId: number;
  name: string;
  description: string;
  createdDate: string;
  createdBy: number;
  updatedDate: string;
  updateBy: number;
  isValid: boolean;
  isSuspended: boolean;
  checkFactorCode: string;
};

export interface CheckFactorState {
  checkFactorList: CheckFactors[];
  currentCheckFactor: CheckFactors | null;
  loadingCheckFactor: boolean;
}

export type TCreateCheckFactor = Pick<CheckFactors, 'name' | 'checkFactorCode' | 'description'>;

export type TFormCreateCheckFactor = TCreateCheckFactor;

export type TUpdateCheckFactor = TCreateCheckFactor & Pick<CheckFactors, 'checkFactorId'>;

export interface GetCheckFactorsList extends BaseAction<typeof GET_CHECK_FACTORS_LIST> {}
export interface GetCheckFactorsListSuccess
  extends BaseAction<Concat<typeof GET_CHECK_FACTORS_LIST, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CheckFactors[]>;
}

export type CheckFactorActions = GetCheckFactorsList | GetCheckFactorsListSuccess;
