import { configureStore } from "@reduxjs/toolkit";
import storage from "../utils/store";
import nameReducer from "./name/nameSlice";
import columnsReducer from "./columns/columnsSlice";
import columnReducer from "./column/columnSlice";
import taskReducer from "./task/taskSlice";
import commentsReducer from "./comments/commentsSlice";

export const store = configureStore({
  reducer: {
    name: nameReducer,
    columns: columnsReducer,
    column: columnReducer,
    task: taskReducer,
    comments: commentsReducer,
  },
  preloadedState: {
    name: {
      name: storage.getName(),
    },
    columns: {
      columns: storage.getColumns(),
    },
    comments: {
      comments: storage.getAllComments(),
    },
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
