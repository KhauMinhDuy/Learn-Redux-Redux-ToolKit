import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlices";
import filterSlice from "./slices/filterSlices";

const store = configureStore({
  // rootReducer
  reducer: {
    filters: filterSlice.reducer,
    todoList: todoSlice.reducer,
  },
});

export default store;
