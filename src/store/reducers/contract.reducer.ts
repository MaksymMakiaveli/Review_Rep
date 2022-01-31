import { ContractActions, ContractState } from '@Types/contract.types';
import {
  DELETE_CONTRACT,
  FAIL,
  GET_CONTRACTS_LIST,
  GET_ONE_CONTRACT,
  POST_NEW_CONTRACT,
  SUCCESS,
} from '../actionTypes';
import { concatActions } from '@helpers/functions';

const initialState: ContractState = {
  contracts: [],
  currentContract: null,
  loadingContract: false,
  errorContract: null,
};

export const ContractReducer = (state = initialState, action: ContractActions): ContractState => {
  switch (action.type) {
    case GET_CONTRACTS_LIST:
      return {
        ...state,
        loadingContract: true,
      };
    case concatActions(GET_CONTRACTS_LIST, SUCCESS):
      return {
        ...state,
        contracts: [...state.contracts, ...action.response.resultObject],
        loadingContract: false,
      };
    case GET_ONE_CONTRACT:
      return {
        ...state,
        loadingContract: true,
      };
    case concatActions(GET_ONE_CONTRACT, SUCCESS):
      return {
        ...state,
        currentContract: action.response.resultObject,
        loadingContract: false,
      };
    case POST_NEW_CONTRACT:
      return {
        ...state,
        loadingContract: true,
      };
    case concatActions(POST_NEW_CONTRACT, SUCCESS):
      return {
        ...state,
        contracts: [...state.contracts, action.response.resultObject],
        loadingContract: false,
      };
    case concatActions(POST_NEW_CONTRACT, FAIL):
      console.log(action.response.errors);
      return {
        ...state,
        loadingContract: false,
      };
    case DELETE_CONTRACT:
      return {
        ...state,
        loadingContract: true,
      };
    case concatActions(DELETE_CONTRACT, SUCCESS):
      const newContracts = state.contracts.filter(
        (contract) => !action.data.contractIds.includes(contract.contractId)
      );
      return {
        ...state,
        contracts: newContracts,
        loadingContract: false,
      };
    default:
      return {
        ...state,
      };
  }
};
