import { ObjectKeysString } from '@Types/application.types';
import { sortBy } from 'lodash';

export interface TableAction {
  type: 'CHANGE_SORT';
  payload: string;
}

export interface TableState<T = ObjectKeysString> {
  sortedData: T[];
  direction: 'descending' | 'ascending' | undefined;
  column: string | null;
}

export const tableReducer = <T extends ObjectKeysString>(
  state: TableState<T>,
  action: TableAction
): TableState<T> => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.payload) {
        return {
          ...state,
          sortedData: state.sortedData.slice().reverse(),
          direction: state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return {
        column: action.payload,
        sortedData: sortBy(state.sortedData, [action.payload]),
        direction: 'ascending',
      };
    default:
      return state;
  }
};
