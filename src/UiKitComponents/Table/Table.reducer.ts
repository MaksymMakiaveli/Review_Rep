import { sortBy } from 'lodash';
import { ReducerAction, ReducerState } from './Table.type';

export const tableReducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.payload.column) {
        return {
          ...state,
          direction: action.payload.direction,
          data: state.data.slice().reverse(),
        };
      }
      return {
        column: action.payload.column,
        data: sortBy(state.data, [action.payload.column]),
        direction: 'asc',
      };
    default:
      return state;
  }
};
