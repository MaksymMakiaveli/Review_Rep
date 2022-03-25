import { ExitTypesActions, ICreateExitType, IUpdateExitType } from '@Types/exitTypes.type';
import {
  DELETE_EXIT_TYPE,
  GET_EXIT_TYPES_LIST,
  GET_ONE_EXIT_TYPE,
  POST_NEW_EXIT_TYPE,
  UPDATE_EXIT_TYPE,
} from '../actionTypes';

export const getExitTypesList = (): ExitTypesActions => ({
  type: GET_EXIT_TYPES_LIST,
  api: {
    url: '/ExitTypes/GetExitTypesList',
    method: 'GET',
  },
});

export const createNewExitType = (exitType: ICreateExitType): ExitTypesActions => ({
  type: POST_NEW_EXIT_TYPE,
  api: {
    url: '/ExitTypes/AddExitTypes',
    method: 'POST',
    data: exitType,
  },
  redirect: {
    path: '/Others/ExitTypes',
  },
  showToaster: {
    type: 'success',
    description: `Exit Type: ${exitType.name} created`,
  },
});

export const getExitTypeById = (id: string): ExitTypesActions => ({
  type: GET_ONE_EXIT_TYPE,
  api: {
    url: `/ExitTypes/GetExitTypeById/${id}`,
    method: 'GET',
  },
});

export const updateExitType = (exitType: IUpdateExitType): ExitTypesActions => ({
  type: UPDATE_EXIT_TYPE,
  api: {
    url: '/ExitTypes/UpdateExitTypes',
    method: 'POST',
    data: {
      ...exitType,
    },
  },
  redirect: {
    path: `/Others/ExitTypes/${exitType.checkFactorId}`,
  },

  showToaster: {
    type: 'success',
    description: `Exit Type: ${exitType.name} updated`,
  },
});

export const removeExitTypeById = (exitTypeIds: number[], name: string): ExitTypesActions => ({
  type: DELETE_EXIT_TYPE,
  api: {
    url: '/ExitTypes/RemoveByIdList',
    method: 'POST',
    data: {
      exitTypeIds,
    },
  },
  redirect: {
    path: '/Others/ExitTypes',
  },
  data: {
    exitTypeIds,
  },
  showToaster: {
    type: 'success',
    description: `Exit Type: ${name} deleted`,
  },
});
