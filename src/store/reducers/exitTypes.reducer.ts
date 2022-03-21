import { ExitTypesActions, ExitTypesState } from '@Types/exitTypes.type';
import {
  DELETE_EXIT_TYPE,
  FAIL,
  GET_EXIT_TYPES_LIST,
  GET_ONE_EXIT_TYPE,
  POST_NEW_EXIT_TYPE,
  SUCCESS,
  UPDATE_EXIT_TYPE,
} from '../actionTypes';
import { concatActions, filteringByRemovedId, mappedAfterUpdate } from '@helpers/functions';

const initialState: ExitTypesState = {
  exitTypesList: [],
  exitType: null,
  exitTypesLoading: false,
  exitTypeError: null,
};

export const ExitTypesReducer = (
  state = initialState,
  action: ExitTypesActions
): ExitTypesState => {
  switch (action.type) {
    case GET_EXIT_TYPES_LIST:
      return {
        ...state,
        exitTypesLoading: true,
      };
    case concatActions(GET_EXIT_TYPES_LIST, SUCCESS):
      return {
        ...state,
        exitTypesList: action.response.resultObject,
        exitTypesLoading: false,
      };
    case concatActions(GET_EXIT_TYPES_LIST, FAIL):
      return {
        ...state,
        exitTypesLoading: false,
      };
    case POST_NEW_EXIT_TYPE:
      return {
        ...state,
        exitTypesLoading: true,
      };
    case concatActions(POST_NEW_EXIT_TYPE, SUCCESS):
      return {
        ...state,
        exitTypesList: [...state.exitTypesList, action.response.resultObject],
        exitTypesLoading: false,
      };
    case concatActions(POST_NEW_EXIT_TYPE, FAIL):
      return {
        ...state,
        exitTypesLoading: false,
      };
    case GET_ONE_EXIT_TYPE:
      return {
        ...state,
        exitTypesLoading: true,
        exitTypeError: null,
      };
    case concatActions(GET_ONE_EXIT_TYPE, SUCCESS):
      return {
        ...state,
        exitType: action.response.resultObject,
        exitTypesLoading: false,
      };
    case concatActions(GET_ONE_EXIT_TYPE, FAIL):
      return {
        ...state,
        exitTypesLoading: false,
        exitTypeError: action.response,
      };
    case UPDATE_EXIT_TYPE:
      return {
        ...state,
        exitTypesLoading: true,
      };
    case concatActions(UPDATE_EXIT_TYPE, SUCCESS):
      return {
        ...state,
        exitType: action.response.resultObject,
        exitTypesList: mappedAfterUpdate(
          state.exitTypesList,
          action.response.resultObject,
          'checkFactorId'
        ),
        exitTypesLoading: false,
      };
    case concatActions(UPDATE_EXIT_TYPE, FAIL):
      return {
        ...state,
        exitTypesLoading: false,
      };
    case DELETE_EXIT_TYPE:
      return {
        ...state,
        exitTypesLoading: true,
      };
    case concatActions(DELETE_EXIT_TYPE, SUCCESS):
      return {
        ...state,
        exitTypesList: filteringByRemovedId(
          state.exitTypesList,
          action.data.exitTypeIds,
          'checkFactorId'
        ),
        exitTypesLoading: false,
      };
    case concatActions(DELETE_EXIT_TYPE, FAIL):
      return {
        ...state,
        exitTypesLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
