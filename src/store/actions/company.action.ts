import { CompanyActions, TUpdateCompany, TCreateCompany, Company } from '@Types/company.types';

import {
  DELETE_COMPANY,
  FAIL,
  GET_COMPANY_LIST,
  GET_ONE_COMPANY,
  POST_NEW_COMPANY,
  SUCCESS,
  UPDATE_COMPANY,
} from '../actionTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@RootStateType';
import axios from '../../config/axios';
import { ResponseAsetlyApi } from '@Types/index';
import { concatActions, handleErrorAndShowToast } from '@helpers/functions';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

export const GetCompanyList = (): CompanyActions => ({
  type: GET_COMPANY_LIST,
  api: {
    url: '/Company/GetCompaniesList',
    method: 'GET',
  },
});

export const GetOneCompany = (id: string | number): CompanyActions => ({
  type: GET_ONE_COMPANY,
  api: {
    url: `/Company/GetCompanyById/${id}`,
    method: 'GET',
  },
});

export const postNewCompany = (newCompany: TCreateCompany): CompanyActions => ({
  type: POST_NEW_COMPANY,
  api: {
    url: '/Company/AddCompany',
    method: 'POST',
    data: {
      ...newCompany,
    },
  },
  showToaster: {
    description: `Company: ${newCompany.name} created`,
    type: 'success',
  },
  redirect: {
    path: '/Companies',
  },
});

export const updateCompany =
  (
    company: TUpdateCompany,
    backToPreview: () => void
  ): ThunkAction<any, RootState, any, CompanyActions> =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_COMPANY });
      const id = company.companyId;
      const updateCompany: AxiosResponse<ResponseAsetlyApi<null>> = await axios.post(
        '/Company/UpdateFirm',
        company
      );
      if (updateCompany.data.resultStatus) {
        const updatedCompany = await axios.get(`/Company/GetCompanyById/${id}`);
        const response: ResponseAsetlyApi<Company> = updatedCompany.data;
        dispatch({ type: concatActions(UPDATE_COMPANY, SUCCESS), response });
        backToPreview();
        toast.success(`Company: ${response.resultObject.name} updated`);
      }
    } catch (error: any) {
      handleErrorAndShowToast(error);
      dispatch({ type: concatActions(UPDATE_COMPANY, FAIL) });
    }
  };

export const deleteCompaniesById = (companyIds: number[], name?: string): CompanyActions => ({
  type: DELETE_COMPANY,
  api: {
    url: `/Company/RemoveByIdList`,
    method: 'POST',
    data: {
      CompanyIds: companyIds,
    },
  },
  data: { companyIds },
  showToaster: {
    type: 'success',
    description: `Company: ${name} deleted`,
  },
});
