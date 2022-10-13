import { createSelector } from "@reduxjs/toolkit";

export const searchTextSelector = (state) => state.filters.search;

export const todoListSelector = (state) => state.todoList.todos;
export const statusSelector = (state) => state.filters.status;
export const prioritySelector = (state) => state.filters.priority;

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
        if (priority.length === 0) {
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
