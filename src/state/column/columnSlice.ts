import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store from "../../utils/store";

interface ColumnState {}

const initialState: ColumnState = {};

export const addColumn = createAsyncThunk(
  "column/addColumnToStorage",
  (name: string) => {
    store.addColumn(name);
  }
);

export const renameColumn = createAsyncThunk(
  "column/renameColumnFromStorage",
  (data: { id: string; name: string }) => {
    store.renameColumn(data.id, data.name);
  }
);

export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {},
});

export default columnSlice.reducer;
