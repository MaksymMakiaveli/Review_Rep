import { CompanyActions, TUpdateCompany, TCreateCompany } from '@Types/company.types';
import {
  DELETE_COMPANY,
  GET_COMPANY_LIST,
  GET_ONE_COMPANY,
  POST_NEW_COMPANY,
  PUT_COMPANY,
} from '../actionTypes';

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
    url: `/Company/GetFirmByCompanyId/${id}`,
    method: 'GET',
  },
});

export const postNewCompany = (newCompany: TCreateCompany): CompanyActions => ({
  type: POST_NEW_COMPANY,

  api: {
    url: '/Company/AddFirm',
    method: 'POST',
    data: {
      ...newCompany,
    },
  },
});

export const updateCompany = (company: TUpdateCompany): CompanyActions => ({
  type: PUT_COMPANY,
  api: {
    url: `/Company/UpdateFirm`,
    method: 'PUT',
    data: {
      ...company,
    },
  },
});

export const deleteCompanies = (companyIds: number[]): CompanyActions => ({
  type: DELETE_COMPANY,
  api: {
    url: `/Company/RemoveByIdList`,
    method: 'POST',
    data: {
      CompanyIds: companyIds,
    },
  },
});
