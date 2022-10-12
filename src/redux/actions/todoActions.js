import * as types from "./actionTypes";

export function addTodoSuccess(data) {
  return { type: types.ADD_TODO, payload: data };
}

export const searchFilter = (text) => {
  return { type: types.SEARCH_FILTER, payload: text };
};

export const statusFilter = (status) => {
  return { type: types.STATUS_FILTER, payload: status };
};

export const priorityFilter = (priority) => {
	return {type: types.PRIORITY_FILTER, payload: priority};
}

export const updateCompleted = (id) => {
	return {type: types.UPDATE_COMPLETED, payload: id};
}
