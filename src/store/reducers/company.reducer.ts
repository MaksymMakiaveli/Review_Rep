import { concatActions, filteringByRemovedId, mappedAfterUpdate } from '@helpers/functions';
import { CompanyActions, CompanyState } from '@Types/company.types';

import {
  DELETE_COMPANY,
  FAIL,
  GET_COMPANY_LIST,
  GET_ONE_COMPANY,
  POST_NEW_COMPANY,
  UPDATE_COMPANY,
  SUCCESS,
} from '../actionTypes';

const initialState: CompanyState = {
  companyList: [],
  company: null,
  companyLoading: false,
};

export const CompanyReducer = (state = initialState, action: CompanyActions): CompanyState => {
  switch (action.type) {
    case GET_COMPANY_LIST:
      return {
        ...state,
        companyLoading: true,
      };
    case concatActions(GET_COMPANY_LIST, SUCCESS):
      return {
        ...state,
        companyList: [...state.companyList, ...action.response.resultObject],
        companyLoading: false,
      };
    case concatActions(GET_COMPANY_LIST, FAIL):
      return {
        ...state,
        companyLoading: false,
      };
    case GET_ONE_COMPANY:
      return {
        ...state,
        companyLoading: true,
      };
    case concatActions(GET_ONE_COMPANY, SUCCESS):
      return {
        ...state,
        company: action.response.resultObject,
        companyLoading: false,
      };
    case POST_NEW_COMPANY:
      return {
        ...state,
        companyLoading: true,
      };
    case concatActions(POST_NEW_COMPANY, SUCCESS):
      return {
        ...state,
        companyList: [...state.companyList, action.response.resultObject],
        companyLoading: false,
      };
    case concatActions(POST_NEW_COMPANY, FAIL):
      return {
        ...state,
        companyLoading: false,
      };
    case UPDATE_COMPANY:
      return {
        ...state,
        companyLoading: true,
      };
    case concatActions(UPDATE_COMPANY, SUCCESS):
      return {
        ...state,
        companyLoading: false,
        company: action.response.resultObject,
        companyList: mappedAfterUpdate(
          state.companyList,
          action.response.resultObject,
          'companyId'
        ),
      };
    case concatActions(UPDATE_COMPANY, FAIL):
      return {
        ...state,
        companyLoading: false,
      };
    case DELETE_COMPANY:
      return {
        ...state,
        companyLoading: true,
      };
    case concatActions(DELETE_COMPANY, SUCCESS):
      const list = state.companyList;
      const ids = action.data.companyIds;
      return {
        ...state,
        companyLoading: false,
        companyList: filteringByRemovedId(list, ids, 'companyId'),
      };
    default:
      return {
        ...state,
      };
  }
};
