import { CheckFactory } from '@Types/checkFactors.type';
import { BaseAction, Concat, ResponseAsetlyApi } from '@Types/index';
import {
  FAIL,
  SUCCESS,
  GET_EXIT_TYPES_LIST,
  GET_ONE_EXIT_TYPE,
  POST_NEW_EXIT_TYPE,
  UPDATE_EXIT_TYPE,
  DELETE_EXIT_TYPE,
} from '../actionTypes';

export interface IExitTypes {
  checkFactorId: CheckFactory['checkFactorId'];
  name: string;
  description: string;
  code: string;
  createdDate: string;
  updatedDate: string;
  createdBy: number;
  updatedBy: number;
  isValid: boolean;
}

export interface ExitTypesState {
  exitTypesList: IExitTypes[];
  exitType: IExitTypes | null;
  exitTypesLoading: boolean;
  exitTypeError: string | null;
}

export interface IExitTypesTable extends Pick<IExitTypes, 'name' | 'checkFactorId' | 'code'> {}

export interface ICreateExitType extends Pick<IExitTypes, 'name' | 'description'> {
  exitTypeCode: IExitTypes['code'];
}
export interface IUpdateExitType
  extends ICreateExitType,
    Required<Pick<IExitTypes, 'checkFactorId'>> {}

export interface GetExitTypesList extends BaseAction<typeof GET_EXIT_TYPES_LIST> {}
export interface GetExitTypesListSuccess
  extends BaseAction<Concat<typeof GET_EXIT_TYPES_LIST, typeof SUCCESS>> {
  response: ResponseAsetlyApi<IExitTypes[]>;
}
export interface GetExitTypesListFail
  extends BaseAction<Concat<typeof GET_EXIT_TYPES_LIST, typeof FAIL>> {}

export interface PostNewExitType extends BaseAction<typeof POST_NEW_EXIT_TYPE, ICreateExitType> {}
export interface PostNewExitTypeSuccess
  extends BaseAction<Concat<typeof POST_NEW_EXIT_TYPE, typeof SUCCESS>> {
  response: ResponseAsetlyApi<IExitTypes>;
}
export interface PostNewExitTypeFail
  extends BaseAction<Concat<typeof POST_NEW_EXIT_TYPE, typeof FAIL>> {}

export interface GetOneExitType extends BaseAction<typeof GET_ONE_EXIT_TYPE> {}
export interface GetOneExitTypeSuccess
  extends BaseAction<Concat<typeof GET_ONE_EXIT_TYPE, typeof SUCCESS>> {
  response: ResponseAsetlyApi<IExitTypes>;
}
export interface GetOneExitTypeFail
  extends BaseAction<Concat<typeof GET_ONE_EXIT_TYPE, typeof FAIL>> {
  response: string;
}

export interface UpdateExitType extends BaseAction<typeof UPDATE_EXIT_TYPE> {}
export interface UpdateExitTypeSuccess
  extends BaseAction<Concat<typeof UPDATE_EXIT_TYPE, typeof SUCCESS>> {
  response: ResponseAsetlyApi<IExitTypes>;
}
export interface UpdateExitTypeFail
  extends BaseAction<Concat<typeof UPDATE_EXIT_TYPE, typeof FAIL>> {}

export interface DeleteExitType extends BaseAction<typeof DELETE_EXIT_TYPE> {}
export interface DeleteExitTypeSuccess
  extends BaseAction<Concat<typeof DELETE_EXIT_TYPE, typeof SUCCESS>> {
  response: ResponseAsetlyApi<null>;
  data: {
    exitTypeIds: number[];
  };
}
export interface DeleteExitTypeFail
  extends BaseAction<Concat<typeof DELETE_EXIT_TYPE, typeof FAIL>> {}

export type ExitTypesActions =
  | GetExitTypesList
  | GetExitTypesListSuccess
  | GetExitTypesListFail
  | PostNewExitType
  | PostNewExitTypeSuccess
  | PostNewExitTypeFail
  | GetOneExitType
  | GetOneExitTypeSuccess
  | GetOneExitTypeFail
  | UpdateExitType
  | UpdateExitTypeSuccess
  | UpdateExitTypeFail
  | DeleteExitType
  | DeleteExitTypeSuccess
  | DeleteExitTypeFail;
