import { sortBy } from 'lodash';

import { TableProps } from './TableTypes.type';

export interface TableAction {
  type: 'CHANGE_SORT';
  payload: string;
}

export interface TableState extends Pick<TableProps, 'data'> {
  direction: 'descending' | 'ascending' | undefined;
  column: string | null;
}

export const tableReducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.payload) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction: state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return {
        column: action.payload,
        data: sortBy(state.data, [action.payload]),
        direction: 'ascending',
      };
    default:
      return state;
  }
};
