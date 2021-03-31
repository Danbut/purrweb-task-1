import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store from "../../utils/store";
import { saveColumns } from "../columns/columnsSlice";
import { getComments } from "../comments/commentsSlice";

interface TaskState {}

const initialState: TaskState = {};

export const addTask = createAsyncThunk(
  "task/addTaskToStorage",
  (data: { name: string; columnId: string }, thunkAPI) => {
    store.addTask(data.name, data.columnId);
    thunkAPI.dispatch(getComments());
    thunkAPI.dispatch(saveColumns(store.getColumns()));
  }
);

export const removeTask = createAsyncThunk(
  "task/removeTaskFromStorage",
  (data: { taskId: string; columnId: string }, thunkAPI) => {
    store.removeTask(data.taskId, data.columnId);
    thunkAPI.dispatch(saveColumns(store.getColumns()));
  }
);

export const changeTaskDescription = createAsyncThunk(
  "task/changeTaskDescriptionInStorage",
  (data: { taskId: string; columnId: string; description: string }) => {
    store.changeTaskDescription(data.taskId, data.columnId, data.description);
  }
);

export const renameTask = createAsyncThunk(
  "task/renameTaskInStorage",
  (data: { taskId: string; columnId: string; name: string }, thunkAPI) => {
    store.renameTask(data.taskId, data.columnId, data.name);
    thunkAPI.dispatch(saveColumns(store.getColumns()));
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
