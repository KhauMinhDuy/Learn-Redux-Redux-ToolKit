import * as types from '../actions/actionTypes';
import {todoState} from './initStates';

export default function todoReducer(state = todoState, action) {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
		case types.SEARCH_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					search: action.payload
				}
			};
		case types.STATUS_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					status: action.payload
				}
			}
		case types.PRIORITY_FILTER:
			return {
				...state,
				filters: {
					...state.filters,
					priority: action.payload
				}
			}
		case types.UPDATE_COMPLETED:
			const newTodoList = state.todoList.map(todo => {
				if(todo.id === action.payload) {
					return {
						...todo,
						completed: !todo.completed
					}
				}
				return todo;
			});
			return {
				...state,
				todoList: newTodoList
			};
    default:
      return state;
  }
}
