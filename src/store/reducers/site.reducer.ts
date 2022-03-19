import { concatActions, mappedAfterUpdate } from '@helpers/functions';

import {
  DELETE_SITE,
  GET_SITE_LIST,
  GET_ONE_SITE,
  POST_NEW_SITE,
  UPDATE_SITE,
  SUCCESS,
  FAIL,
} from '../actionTypes';
import { SiteActions, SiteState } from '@Types/site.types';

const initialState: SiteState = {
  siteList: [],
  currentSite: null,
  loadingSite: false,
};

export const SiteReducer = (state = initialState, action: SiteActions): SiteState => {
  switch (action.type) {
    case GET_SITE_LIST:
      return {
        ...state,
        loadingSite: true,
      };
    case concatActions(GET_SITE_LIST, SUCCESS):
      return {
        ...state,
        siteList: [...state.siteList, ...action.response.resultObject],
        loadingSite: false,
      };
    case GET_ONE_SITE:
      return {
        ...state,
        loadingSite: true,
      };
    case concatActions(GET_ONE_SITE, SUCCESS):
      return {
        ...state,
        currentSite: action.response.resultObject[0],
        loadingSite: false,
      };
    case POST_NEW_SITE:
      return {
        ...state,
        loadingSite: true,
      };
    case concatActions(POST_NEW_SITE, SUCCESS):
      return {
        ...state,
        siteList: [...state.siteList, action.response.resultObject],
        loadingSite: false,
      };
    case concatActions(POST_NEW_SITE, FAIL):
      return {
        ...state,
        loadingSite: false,
      };
    case UPDATE_SITE:
      return {
        ...state,
        loadingSite: true,
      };
    case concatActions(UPDATE_SITE, SUCCESS):
      return {
        ...state,
        loadingSite: false,
        currentSite: action.response.resultObject,
        siteList: mappedAfterUpdate(state.siteList, action.response.resultObject, 'siteId'),
      };
    case concatActions(UPDATE_SITE, FAIL):
      return {
        ...state,
        loadingSite: false,
      };
    case DELETE_SITE:
      return {
        ...state,
      };
    case concatActions(DELETE_SITE, SUCCESS):
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
