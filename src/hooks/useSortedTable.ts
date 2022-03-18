import { ReducerAction, ReducerState } from '../UiKitComponents/TableRS/Table.type';
import { sortBy } from 'lodash';
import { useReducer } from 'react';

interface HookReturn<T = any> {
  sortedData: T[];
  column: string;
  direction: 'desc' | 'asc' | undefined;
  sortColumn: (dataKey: string, sortType: 'desc' | 'asc' | undefined) => void;
}

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

function useSortedTable<T>(data: T[]): HookReturn<T> {
  const [state, dispatch] = useReducer(tableReducer, {
    data,
    column: '',
    direction: undefined,
  });

  const sortColumn = (dataKey: string, sortType: 'desc' | 'asc' | undefined) => {
    const payload = {
      direction: sortType,
      column: dataKey,
    };
    dispatch({ type: 'CHANGE_SORT', payload });
  };

  return {
    sortColumn,
    sortedData: state.data,
    column: state.column,
    direction: state.direction,
  };
}

export default useSortedTable;
