import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const addTodos = (todo) => {
//   // thunk action creators
//   return (dispatch, getState) => {
//     // thunk action
//     dispatch(todoSlice.actions.addTodo(todo));
//     console.log("[addTodos after]", getState());
//   };
// };

export const loadTodos = createAsyncThunk("todos/loadTodos", async () => {
  const res = await fetch("/api/todos");
  const data = await res.json();
  return data.todos;
});

/*
	=> todos/loadTodos/pending
	=> todos/loadTodos/fullfilled
	=> todos/loadTodos/rejected
 */

export const addTodos = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const res = await fetch("/api/todos", { method: "POST", body: JSON.stringify(newTodo) });
  const data = await res.json();
  return data.todos;
});

export const updateTodoCompleted = createAsyncThunk(
  "todos/updateTodoCompleted",
  async (id) => {
    const res = await fetch("/api/updateTodo", {
      method: "POST",
      body: JSON.stringify(id),
    });
    const data = await res.json();
    return data.todos;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: { status: "idle", todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    updateCompleted: (state, action) => {
      const currentTodo = state.todos.find((todo) => todo.id === action.payload);
      currentTodo.completed = !currentTodo.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
			.addCase(addTodos.pending, (state, action) => {
				state.status = 'loading';
			})
      .addCase(addTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
			.addCase(updateTodoCompleted.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(updateTodoCompleted.fulfilled, (state, action) => {
				let currentTodo = state.todos.find((todo) => todo.id === action.payload.id);
				// eslint-disable-next-line no-unused-vars
				currentTodo = action.payload;
			})
  },
});

export default todoSlice;
