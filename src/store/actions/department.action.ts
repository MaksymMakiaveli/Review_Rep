import {
  CHANGE_PARENT_FOR_DEPARTMENTS,
  DELETE_DEPARTMENT,
  GET_DEPARTMENT_LIST,
  GET_ONE_DEPARTMENT,
  POST_NEW_DEPARTMENT,
  UPDATE_DEPARTMENT,
  SUCCESS,
} from '../actionTypes';
import {
  Department,
  DepartmentActions,
  NewDepartment,
  PutDepartment,
  TDepartmentTable,
} from '@Types/department.types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@RootStateType';
import axios from '../../config/axios';
import { AxiosResponse } from 'axios';
import { ResponseAsetlyApi } from '@Types/index';
import { concatActions } from '@helpers/functions';

export const GetDepartmentList = (): DepartmentActions => ({
  type: GET_DEPARTMENT_LIST,
  api: {
    url: '/Department/GetDepartmentsList',
    method: 'GET',
  },
});

export const GetOneDepartment = (id: string | number): DepartmentActions => ({
  type: GET_ONE_DEPARTMENT,
  api: {
    url: `/Department/GetDepartmentById/${id}`,
    method: 'GET',
  },
});

export const postNewDepartment = (newDepartment: NewDepartment): DepartmentActions => ({
  type: POST_NEW_DEPARTMENT,
  api: {
    url: '/Department/AddDepartment',
    method: 'POST',
    data: {
      ...newDepartment,
    },
  },
  redirect: {
    path: '/Departments',
  },
  showToaster: {
    type: 'success',
    description: ` Department:${newDepartment.name} created`,
  },
});

export const updateDepartment = (department: PutDepartment): DepartmentActions => ({
  type: UPDATE_DEPARTMENT,
  api: {
    url: '/Department/UpdateDepartment',
    method: 'POST',
    data: {
      ...department,
    },
  },
});

export const deleteDepartment = (departmentIds: number[]): DepartmentActions => ({
  type: DELETE_DEPARTMENT,
  api: {
    url: `/Department/RemoveByIdList`,
    method: 'POST',
    data: {
      DepartmentIds: departmentIds,
    },
  },
});

export const changeParentForDepartments =
  (
    children: TDepartmentTable[],
    parent: TDepartmentTable
  ): ThunkAction<any, RootState, any, DepartmentActions> =>
  async (dispatch) => {
    try {
      const idsChildren = children.map((child) => child.departmentId);
      const parameters = {
        fromDepartmentIds: idsChildren,
        toDepartmentId: parent.departmentId,
      };
      dispatch({ type: CHANGE_PARENT_FOR_DEPARTMENTS });
      const updateDepartmentList: AxiosResponse<ResponseAsetlyApi<null>> = await axios.post(
        '/Department/ChangeDepartmentParentReleations',
        parameters
      );
      if (updateDepartmentList.status === 200 && updateDepartmentList.data.resultStatus) {
        const updatedDepartmentList: AxiosResponse<ResponseAsetlyApi<Department[]>> =
          await axios.get('/Department/GetDepartmentsList');
        const response = updatedDepartmentList.data;
        dispatch({ type: concatActions(CHANGE_PARENT_FOR_DEPARTMENTS, SUCCESS), response });
      }
    } catch (error: any) {}
  };
