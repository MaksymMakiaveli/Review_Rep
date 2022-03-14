import { TitleActions, TitleState } from '@Types/title.types';
import { concatActions } from '@helpers/functions';
import {
  DELETE_TITLE,
  FAIL,
  GET_TITLE_LIST,
  GET_ONE_TITLE,
  POST_NEW_TITLE,
  UPDATE_TITLE,
  SUCCESS,
} from '../actionTypes';

const initialState: TitleState = {
  titleList: [],
  currentTitle: null,
  loadingTitle: false,
};

export const TitleReducer = (state = initialState, action: TitleActions): TitleState => {
  switch (action.type) {
    case GET_TITLE_LIST:
      return {
        ...state,
        loadingTitle: true,
      };
    case concatActions(GET_TITLE_LIST, SUCCESS):
      return {
        ...state,
        titleList: [...state.titleList, ...action.response.resultObject],
        loadingTitle: false,
      };
    case GET_ONE_TITLE:
      return {
        ...state,
        loadingTitle: true,
      };
    case concatActions(GET_ONE_TITLE, SUCCESS):
      return {
        ...state,
        currentTitle: action.response.resultObject,
        loadingTitle: false,
      };
    case POST_NEW_TITLE:
      return {
        ...state,
        loadingTitle: true,
      };
    case concatActions(POST_NEW_TITLE, SUCCESS):
      return {
        ...state,
        titleList: [...state.titleList, action.response.resultObject],
        loadingTitle: false,
      };
    case concatActions(POST_NEW_TITLE, FAIL):
      return {
        ...state,
        loadingTitle: false,
      };
    case UPDATE_TITLE:
      return {
        ...state,
        loadingTitle: true,
      };
    case concatActions(UPDATE_TITLE, SUCCESS):
      return {
        ...state,
        loadingTitle: false,
      };
    case DELETE_TITLE:
      return {
        ...state,
      };
    case concatActions(DELETE_TITLE, SUCCESS):
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
