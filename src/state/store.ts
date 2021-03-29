import { configureStore } from "@reduxjs/toolkit";
import storage from "../utils/store";
import nameReducer from "./name/nameSlice";
import columnsReducer from "./columns/columnsSlice";

export const store = configureStore({
  reducer: {
    name: nameReducer,
    columns: columnsReducer,
  },
  preloadedState: {
    name: {
      name: storage.getName(),
    },
    columns: {
      columns: storage.getColumns(),
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
