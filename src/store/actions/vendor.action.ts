import { VendorActions, TCreateVendor, TUpdateVendor, Vendor } from '@Types/vendor.types';

import {
  DELETE_VENDOR,
  GET_VENDOR_LIST,
  GET_ONE_VENDOR,
  POST_NEW_VENDOR,
  UPDATE_VENDOR,
  SUCCESS,
  FAIL,
} from '../actionTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@RootStateType';
import axios from '../../config/axios';
import { ResponseAsetlyApi } from '@Types/index';
import { concatActions, handleErrorAndShowToast } from '@helpers/functions';
import { toast } from 'react-toastify';

export const GetVendorList = (): VendorActions => ({
  type: GET_VENDOR_LIST,
  api: {
    url: '/Vendor/GetVendorList',
    method: 'GET',
  },
});

export const GetOneVendor = (id: string | number): VendorActions => ({
  type: GET_ONE_VENDOR,
  api: {
    url: `/Vendor/GetVendorById/${id}`,
    method: 'GET',
  },
});

export const postNewVendor = (newVendor: TCreateVendor): VendorActions => ({
  type: POST_NEW_VENDOR,

  api: {
    url: '/Vendor/AddVendor',
    method: 'POST',
    data: {
      ...newVendor,
    },
  },
  redirect: {
    path: '/Vendors',
  },
  showToaster: {
    type: 'success',
    description: `${newVendor.name} is created`,
  },
});

export const updateVendor =
  (
    vendor: TUpdateVendor,
    backToPreview: () => void
  ): ThunkAction<any, RootState, any, VendorActions> =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_VENDOR });
      const id = vendor.partnerId;
      const updateCompany = await axios.post('/Vendor/UpdateVendor', vendor);
      const responseFromUpdate: ResponseAsetlyApi<null> = updateCompany.data;
      if (responseFromUpdate.resultStatus) {
        const updatedVendor = await axios.get(`/Vendor/GetVendorById/${id}`);
        const response: ResponseAsetlyApi<Vendor> = updatedVendor.data;
        dispatch({ type: concatActions(UPDATE_VENDOR, SUCCESS), response });
        backToPreview();
        toast.success(`${vendor.name} is updated`);
      }
    } catch (error: any) {
      handleErrorAndShowToast(error);
      dispatch({ type: concatActions(UPDATE_VENDOR, FAIL) });
    }
  };

export const deleteVendor = (partnerIds: number[], name?: string): VendorActions => ({
  type: DELETE_VENDOR,
  api: {
    url: `/Vendor/RemoveByIdList`,
    method: 'POST',
    data: {
      PartnerIds: partnerIds,
    },
  },
  data: {
    partnerIds,
  },
  showToaster: {
    type: 'success',
    description: `${name} is deleted`,
  },
});
