import { concatActions } from '@helpers/functions';

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
import { DepartmentActions, DepartmentState } from '../types/department.types';

const initialState: DepartmentState = {
  departmentList: [],
  currentDepartment: null,
  loadingDepartment: false,
};

export const DepartmentReducer = (
  state = initialState,
  action: DepartmentActions
): DepartmentState => {
  switch (action.type) {
    case GET_DEPARTMENT_LIST:
      return {
        ...state,
        loadingDepartment: true,
      };
    case concatActions(GET_DEPARTMENT_LIST, SUCCESS):
      return {
        ...state,
        departmentList: [...state.departmentList, ...action.response.resultObject],
        loadingDepartment: false,
      };
    case GET_ONE_DEPARTMENT:
      return {
        ...state,
        loadingDepartment: true,
      };
    case concatActions(GET_ONE_DEPARTMENT, SUCCESS):
      return {
        ...state,
        currentDepartment: action.response.resultObject[0],
        loadingDepartment: false,
      };
    case POST_NEW_DEPARTMENT:
      return {
        ...state,
        loadingDepartment: true,
      };
    case concatActions(POST_NEW_DEPARTMENT, SUCCESS):
      return {
        ...state,
        departmentList: [...state.departmentList, action.response.resultObject],
        loadingDepartment: false,
      };
    case concatActions(POST_NEW_DEPARTMENT, FAIL):
      return {
        ...state,
        loadingDepartment: false,
      };
    case PUT_DEPARTMENT:
      return {
        ...state,
        loadingDepartment: true,
      };
    case concatActions(PUT_DEPARTMENT, SUCCESS):
      return {
        ...state,
        loadingDepartment: false,
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
      };
    case concatActions(DELETE_DEPARTMENT, SUCCESS):
      return {
        ...state,
      };
    case CHANGE_PARENT_FOR_DEPARTMENTS:
      return {
        ...state,
        loadingDepartment: true,
      };

    case concatActions(CHANGE_PARENT_FOR_DEPARTMENTS, SUCCESS):
      return {
        ...state,
        departmentList: action.response.resultObject,
        loadingDepartment: false,
      };
    default:
      return {
        ...state,
      };
  }
};
