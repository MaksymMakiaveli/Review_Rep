import {
  FAIL,
  SUCCESS,
  DELETE_DEPARTMENT,
  GET_DEPARTMENT_LIST,
  GET_ONE_DEPARTMENT,
  POST_NEW_DEPARTMENT,
  UPDATE_DEPARTMENT,
  CHANGE_PARENT_FOR_DEPARTMENTS,
} from '../actionTypes';
import { BaseAction, Concat, ResponseAsetlyApi } from './index';
import { Site } from './site.types';

export type Department = {
  companyId: number;
  departmentId: number;
  siteId: number;
  departmentCode: string;
  name: string;
  createdDate: string;
  creatorId: number;
  description: string;
  site: Site;
  isValid: boolean;
  modifiedDate: string;
  modifiedId: number;
  parentDepartment: Department;
  parentDepartmentId: number;
  childDepartment: Department[];
  //TODO: как узнаем тип массива изменить any
  inverseParentDepartment: any[];
  nonCurrAssets: any[];
  suppliesLogs: any[];
  users: any[];
};

export interface IDepartmentTable
  extends Required<Pick<Department, 'name' | 'departmentCode' | 'departmentId'>> {
  parentName: Department['name'];
  siteName: Site['name'];
  children: IDepartmentTable[];
}

export interface IDepartmentTable
  extends Pick<Department, 'name' | 'departmentCode' | 'departmentId'> {}

export interface IFormDepartment
  extends Pick<Department, 'parentDepartmentId' | 'siteId' | 'departmentCode' | 'name'> {}

export interface ICreateDepartment extends IFormDepartment {}

export interface IUpdateDepartment extends IFormDepartment, Pick<Department, 'departmentId'> {}

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
    resultObject: Department[];
  };
}
export interface PostNewDepartmentFail
  extends BaseAction<Concat<typeof POST_NEW_DEPARTMENT, typeof FAIL>> {}

export interface UpdateDepartment extends BaseAction<typeof UPDATE_DEPARTMENT> {}
export interface UpdateDepartmentSuccess
  extends BaseAction<Concat<typeof UPDATE_DEPARTMENT, typeof SUCCESS>> {
  response: {
    departments: Department[];
    updateDepartment: Department;
  };
}
export interface UpdateDepartmentFail
  extends BaseAction<Concat<typeof UPDATE_DEPARTMENT, typeof FAIL>> {}

export interface DeleteDepartment extends BaseAction<typeof DELETE_DEPARTMENT> {}
export interface DeleteDepartmentSuccess
  extends BaseAction<Concat<typeof DELETE_DEPARTMENT, typeof SUCCESS>> {
  response: ResponseAsetlyApi<Department[]>;
}
export interface DeleteDepartmentFail
  extends BaseAction<Concat<typeof DELETE_DEPARTMENT, typeof FAIL>> {}

export interface ChangeParentForDepartments
  extends BaseAction<typeof CHANGE_PARENT_FOR_DEPARTMENTS> {}
export interface ChangeParentForDepartmentsSuccess
  extends BaseAction<Concat<typeof CHANGE_PARENT_FOR_DEPARTMENTS, typeof SUCCESS>> {
  response: ResponseAsetlyApi<Department[]>;
}
export interface ChangeParentForDepartmentsFail
  extends BaseAction<Concat<typeof CHANGE_PARENT_FOR_DEPARTMENTS, typeof FAIL>> {}

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
  | UpdateDepartmentFail
  | DeleteDepartment
  | DeleteDepartmentSuccess
  | DeleteDepartmentFail
  | ChangeParentForDepartments
  | ChangeParentForDepartmentsSuccess
  | ChangeParentForDepartmentsFail;
