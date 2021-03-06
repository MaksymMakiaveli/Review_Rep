import { concatActions, filteringByRemovedId, mappedAfterUpdate } from '@helpers/functions';

import {
  DELETE_VENDOR,
  FAIL,
  GET_VENDOR_LIST,
  GET_ONE_VENDOR,
  POST_NEW_VENDOR,
  UPDATE_VENDOR,
  SUCCESS,
} from '../actionTypes';
import { VendorActions, VendorState } from '@Types/vendor.types';

const initialState: VendorState = {
  vendorList: [],
  currentVendor: null,
  loadingVendor: false,
};

export const VendorReducer = (state = initialState, action: VendorActions): VendorState => {
  switch (action.type) {
    case GET_VENDOR_LIST:
      return {
        ...state,
        loadingVendor: true,
      };
    case concatActions(GET_VENDOR_LIST, SUCCESS):
      return {
        ...state,
        vendorList: [...state.vendorList, ...action.response.resultObject],
        loadingVendor: false,
      };
    case GET_ONE_VENDOR:
      return {
        ...state,
        loadingVendor: true,
      };
    case concatActions(GET_ONE_VENDOR, SUCCESS):
      return {
        ...state,
        currentVendor: action.response.resultObject,
        loadingVendor: false,
      };
    case POST_NEW_VENDOR:
      return {
        ...state,
        loadingVendor: true,
      };
    case concatActions(POST_NEW_VENDOR, SUCCESS):
      return {
        ...state,
        vendorList: [...state.vendorList, action.response.resultObject],
        loadingVendor: false,
      };
    case concatActions(POST_NEW_VENDOR, FAIL):
      return {
        ...state,
        loadingVendor: false,
      };
    case UPDATE_VENDOR:
      return {
        ...state,
        loadingVendor: true,
      };
    case concatActions(UPDATE_VENDOR, SUCCESS):
      return {
        ...state,
        loadingVendor: false,
        currentVendor: action.response.resultObject,
        vendorList: mappedAfterUpdate(state.vendorList, action.response.resultObject, 'partnerId'),
      };
    case concatActions(UPDATE_VENDOR, FAIL):
      return {
        ...state,
        loadingVendor: false,
      };
    case DELETE_VENDOR:
      return {
        ...state,
        loadingVendor: true,
      };
    case concatActions(DELETE_VENDOR, SUCCESS):
      const list = state.vendorList;
      const ids = action.data.partnerIds;
      return {
        ...state,
        loadingVendor: false,
        vendorList: filteringByRemovedId(list, ids, 'partnerId'),
      };
    default:
      return {
        ...state,
      };
  }
};
