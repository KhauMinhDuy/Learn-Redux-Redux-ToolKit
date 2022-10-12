import { createSelector } from "reselect";

export const searchTextSelector = (state) => state.todo.filters.search;
export const todoListSelector = (state) => state.todo.todoList;
export const statusSelector = (state) => state.todo.filters.status;
export const prioritySelector = (state) => state.todo.filters.priority;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  searchTextSelector,
  statusSelector,
  prioritySelector,
  (todoList, searchText, status, priority) => {
    return todoList
      .filter((todo) => todo.name.toLowerCase().includes(searchText.toLowerCase()))
      .filter((todo) => {
        if (status === "All") {
          return todo;
        }
        return status === "Completed" ? todo.completed : !todo.completed;
      })
      .filter((todo) => {
				if(priority.length === 0) {
					return todo;
				}
				return priority.includes(todo.priority);
			});
  }
);

// export const todoListSelector = (state) => {
//   const searchText = searchTextSelector(state);
//   const todosRemaining = state.todoReducer.todoList.filter((todo) => {
//     return todo.name.includes(searchText);
//   });
//   return todosRemaining;
// };
