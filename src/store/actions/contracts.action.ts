import { ContractActions, TCreateContract } from '@Types/contract.types';
import {
  DELETE_CONTRACT,
  GET_CONTRACTS_LIST,
  GET_ONE_CONTRACT,
  POST_NEW_CONTRACT,
} from '../actionTypes';

export const getContractList = (): ContractActions => ({
  type: GET_CONTRACTS_LIST,
  api: {
    url: '/Contract/GetContractList',
    method: 'GET',
  },
});

export const getOneContract = (id: string | number): ContractActions => ({
  type: GET_ONE_CONTRACT,
  api: {
    url: `/Contract/GetContractById/${id}`,
    method: 'GET',
  },
});

export const postNewContract = (newContract: TCreateContract): ContractActions => ({
  type: POST_NEW_CONTRACT,
  api: {
    url: '/Contract/AddContract',
    method: 'POST',
    data: { ...newContract },
  },
});

export const deleteContractById = (contractIds: { contractIds: number[] }): ContractActions => ({
  type: DELETE_CONTRACT,
  api: {
    url: '/Contract/RemoveByIdList',
    method: 'POST',
    data: contractIds,
  },
  data: contractIds,
});
