import { TSelectValue } from '@Types/application.types';

import {
  FAIL,
  SUCCESS,
  DELETE_DEPARTMENT,
  GET_DEPARTMENT_LIST,
  GET_ONE_DEPARTMENT,
  POST_NEW_DEPARTMENT,
  PUT_DEPARTMENT,
  CHANGE_PARENT_FOR_DEPARTMENTS,
} from '../actionTypes';
import { BaseAction, Concat, ResponseAsetlyApi } from './index';
import { Site } from './site.types';

export type Department = {
  childDepartment: Department[];
  companyId: number;
  departmentId: number;
  siteId: number;
  departmentCode: string;
  name: string;
  // createdDate: string,
  creatorId: number;
  description: string;
  site: Site;
  isValid: boolean;
  modifiedDate: string;
  modifiedId: number;
  parentDepartment: Department;
  parentDepartmentId: number;
  //TODO: как узнаем тип массива изменить any
  inverseParentDepartment: any[];
  nonCurrAssets: any[];
  suppliesLogs: any[];
  users: any[];
};

export interface TDepartmentTable
  extends Required<Pick<Department, 'name' | 'departmentCode' | 'departmentId'>> {
  parentName: Department['name'];
  siteName: Site['name'];
  children: TDepartmentTable[];
  parentId: Department['parentDepartmentId'];
}

export type NewDepartment = {
  departmentId: number;
  parentDepartmentId: number | undefined;
  siteId: number;
  departmentCode: string;
  name: string;
  description: string;
  createdDate: string;
  creatorId: number;
  modifiedDate: string;
  modifiedId: number;
  isActive: boolean;
};

export type TFormCreateDepartment = Omit<NewDepartment, 'parentDepartmentId' | 'siteId'> & {
  parentDepartmentId: TSelectValue<number>;
  siteId: TSelectValue<number>;
};

export type PutDepartment = NewDepartment & Pick<Department, 'departmentId'>;

export interface DepartmentState {
  departmentList: Department[] | [];
  currentDepartment: Department | null;
  loadingDepartment: boolean;
}

export interface GetDepartmentList extends BaseAction<typeof GET_DEPARTMENT_LIST> {}
export interface GetDepartmentListSuccess
  extends BaseAction<Concat<typeof GET_DEPARTMENT_LIST, typeof SUCCESS>> {
  response: {
    resultStatus: boolean;
    resultObject: Department[];
  };
}

export interface GetOneDepartment extends BaseAction<typeof GET_ONE_DEPARTMENT> {}
export interface GetOneDepartmentSuccess
  extends BaseAction<Concat<typeof GET_ONE_DEPARTMENT, typeof SUCCESS>> {
  response: {
    resultStatus: boolean;
    resultObject: Department[];
  };
}

export interface PostNewDepartment extends BaseAction<typeof POST_NEW_DEPARTMENT> {}
export interface PostNewDepartmentSuccess
  extends BaseAction<Concat<typeof POST_NEW_DEPARTMENT, typeof SUCCESS>> {
  response: {
    resultObject: Department;
  };
}
export interface PostNewDepartmentFail
  extends BaseAction<Concat<typeof POST_NEW_DEPARTMENT, typeof FAIL>> {}

export interface UpdateDepartment extends BaseAction<typeof PUT_DEPARTMENT> {}
export interface UpdateDepartmentSuccess
  extends BaseAction<Concat<typeof PUT_DEPARTMENT, typeof SUCCESS>> {
  response: {
    resultObject: Department;
  };
}

export interface DeleteDepartment extends BaseAction<typeof DELETE_DEPARTMENT> {}
export interface DeleteDepartmentSuccess
  extends BaseAction<Concat<typeof DELETE_DEPARTMENT, typeof SUCCESS>> {
  response: {
    resultStatus: boolean;
    languageKeyword: string;
    resultObject: [];
  };
}

export interface ChangeParentForDepartments
  extends BaseAction<typeof CHANGE_PARENT_FOR_DEPARTMENTS> {}
export interface ChangeParentForDepartmentsSuccess
  extends BaseAction<Concat<typeof CHANGE_PARENT_FOR_DEPARTMENTS, typeof SUCCESS>> {
  response: ResponseAsetlyApi<Department[]>;
}

export type DepartmentActions =
  | GetDepartmentList
  | GetDepartmentListSuccess
  | GetOneDepartment
  | GetOneDepartmentSuccess
  | PostNewDepartment
  | PostNewDepartmentSuccess
  | PostNewDepartmentFail
  | UpdateDepartment
  | UpdateDepartmentSuccess
  | DeleteDepartment
  | DeleteDepartmentSuccess
  | ChangeParentForDepartments
  | ChangeParentForDepartmentsSuccess;
