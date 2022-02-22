import { BaseAction, Concat, ResponseAsetlyApi } from '@Types/index';
import {
  DELETE_CHECK_FACTORY,
  GET_CHECK_FACTORS_LIST,
  GET_ONE_CHECK_FACTORY,
  POST_NEW_CHECK_FACTOR,
  SUCCESS,
  UPDATE_CHECK_FACTORY,
} from '../actionTypes';

export type CheckFactory = {
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
  checkFactorList: CheckFactory[];
  currentCheckFactor: CheckFactory | null;
  loadingCheckFactor: boolean;
}

export type TCheckFactorTable = Required<
  Pick<CheckFactory, 'name' | 'checkFactorCode' | 'checkFactorId'>
> & { children: TCheckFactorTable[] | null };

export type TCreateCheckFactor = Pick<CheckFactory, 'name' | 'checkFactorCode' | 'description'>;

export type TFormCreateCheckFactor = TCreateCheckFactor;

export type TUpdateCheckFactor = TCreateCheckFactor & Pick<CheckFactory, 'checkFactorId'>;

export interface GetCheckFactorsList extends BaseAction<typeof GET_CHECK_FACTORS_LIST> {}
export interface GetCheckFactorsListSuccess
  extends BaseAction<Concat<typeof GET_CHECK_FACTORS_LIST, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CheckFactory[]>;
}

export interface PostNewCheckFactor extends BaseAction<typeof POST_NEW_CHECK_FACTOR> {}
export interface PostNewCheckFactorSuccess
  extends BaseAction<Concat<typeof POST_NEW_CHECK_FACTOR, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CheckFactory>;
}

export interface GetOneCheckFactory extends BaseAction<typeof GET_ONE_CHECK_FACTORY> {}
export interface GetOneCheckFactorySuccess
  extends BaseAction<Concat<typeof GET_ONE_CHECK_FACTORY, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CheckFactory>;
}

export interface DeleteCheckFactory extends BaseAction<typeof DELETE_CHECK_FACTORY> {}
export interface DeleteCheckFactorySuccess
  extends BaseAction<Concat<typeof DELETE_CHECK_FACTORY, typeof SUCCESS>> {
  data: { checkFactorId: number[] };
}

export interface UpdateCheckFactory extends BaseAction<typeof UPDATE_CHECK_FACTORY> {}
export interface UpdateCheckFactorySuccess
  extends BaseAction<Concat<typeof UPDATE_CHECK_FACTORY, typeof SUCCESS>> {
  response: ResponseAsetlyApi<CheckFactory>;
}

export type CheckFactorActions =
  | GetCheckFactorsList
  | GetCheckFactorsListSuccess
  | PostNewCheckFactor
  | PostNewCheckFactorSuccess
  | GetOneCheckFactory
  | GetOneCheckFactorySuccess
  | DeleteCheckFactory
  | DeleteCheckFactorySuccess
  | UpdateCheckFactory
  | UpdateCheckFactorySuccess;
