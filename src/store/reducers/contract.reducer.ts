import { ContractActions, ContractState } from '@Types/contract.types';
import { GET_CONTRACTS_LIST, POST_NEW_CONTRACT, SUCCESS } from '../actionTypes';
import { concatActions } from '@helpers/functions';

const initialState: ContractState = {
  contracts: [],
  currentContract: null,
  loadingContract: false,
};

export const ContractReducer = (state = initialState, action: ContractActions): ContractState => {
  switch (action.type) {
    case GET_CONTRACTS_LIST:
      return {
        ...state,
        loadingContract: true,
      };
    case concatActions(GET_CONTRACTS_LIST, SUCCESS):
      const newContractList = action.response.resultObject.map((contract) => {
        return {
          ...contract,
          startDate: contract.startDate.split('T')[0],
          endDate: contract.endDate.split('T')[0],
        };
      });
      return {
        ...state,
        contracts: newContractList,
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
    default:
      return {
        ...state,
      };
  }
};
