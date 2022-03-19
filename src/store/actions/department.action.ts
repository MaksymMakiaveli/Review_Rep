import {
  CHANGE_PARENT_FOR_DEPARTMENTS,
  DELETE_DEPARTMENT,
  GET_DEPARTMENT_LIST,
  GET_ONE_DEPARTMENT,
  POST_NEW_DEPARTMENT,
  UPDATE_DEPARTMENT,
  SUCCESS,
  FAIL,
} from '../actionTypes';
import {
  Department,
  DepartmentActions,
  NewDepartment,
  IUpdateDepartment,
  TDepartmentTable,
} from '@Types/department.types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@RootStateType';
import { AxiosResponse } from 'axios';
import { ResponseAsetlyApi } from '@Types/index';
import { concatActions, handleErrorAndShowToast, returnLanguageKeyword } from '@helpers/functions';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import customHistory from '../../config/history';

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

export const updateDepartment =
  (
    department: IUpdateDepartment,
    backToPreview: () => void
  ): ThunkAction<any, RootState, any, DepartmentActions> =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_DEPARTMENT });
      const updatedDepartment: AxiosResponse<ResponseAsetlyApi<Department[]>> = await axios.post(
        '/Department/UpdateDepartment',
        department
      );
      if (updatedDepartment.data.resultStatus) {
        const updatedList: AxiosResponse<ResponseAsetlyApi<Department[]>> = await axios.get(
          '/Department/GetDepartmentsList'
        );
        const responseDepartments = updatedList.data.resultObject;
        const response = {
          departments: responseDepartments,
          updateDepartment: updatedDepartment.data.resultObject[0],
        };
        dispatch({
          type: concatActions(UPDATE_DEPARTMENT, SUCCESS),
          response,
        });
        backToPreview();
        toast.success(`Department: ${department.name} updated`);
      }
    } catch (error: any) {
      handleErrorAndShowToast(error);
      dispatch({ type: concatActions(UPDATE_DEPARTMENT, FAIL) });
    }
  };

export const deleteDepartment =
  (departmentIds: number[], name: string): ThunkAction<any, RootState, any, DepartmentActions> =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_DEPARTMENT });
      const deleteCompany: AxiosResponse<ResponseAsetlyApi<null>> = await axios.post(
        '/Department/RemoveByIdList',
        { departmentIds }
      );
      if (deleteCompany.data.resultStatus) {
        const updatedDepartmentList: AxiosResponse<ResponseAsetlyApi<Department[]>> =
          await axios.get('/Department/GetDepartmentsList');
        const response = updatedDepartmentList.data;

        dispatch({ type: concatActions(DELETE_DEPARTMENT, SUCCESS), response });
        customHistory.replace('/Departments');
        toast.success(`Department: ${name} deleted`);
      } else {
        const keyword = returnLanguageKeyword(deleteCompany.data.languageKeyword);
        toast.error(`Department: ${keyword}`);
        dispatch({ type: concatActions(DELETE_DEPARTMENT, FAIL) });
      }
    } catch (error: any) {
      handleErrorAndShowToast(error);
      dispatch({ type: concatActions(DELETE_DEPARTMENT, FAIL) });
    }
  };

export const changeParentForDepartments =
  (
    children: TDepartmentTable[],
    parent: TDepartmentTable | 0
  ): ThunkAction<any, RootState, any, DepartmentActions> =>
  async (dispatch) => {
    try {
      dispatch({ type: CHANGE_PARENT_FOR_DEPARTMENTS });
      const idsChildren = children.map((child) => child.departmentId);
      const parameters = {
        fromDepartmentIds: idsChildren,
        toDepartmentId: parent === 0 ? 0 : parent.departmentId,
      };
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
    } catch (error: any) {
      handleErrorAndShowToast(error);
      dispatch({ type: concatActions(CHANGE_PARENT_FOR_DEPARTMENTS, FAIL) });
    }
  };
