import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IColumn } from "../../entities/Column/IColumn";
import store from "../../utils/store";
import { RootState } from "../store";

interface ColumnsState {
  columns: IColumn[];
}

const initialState: ColumnsState = {
  columns: [],
};

export const addColumns = createAsyncThunk(
  "name/addColumnsToStorage",
  (columns: string[]) => {
    return store.addColumns(columns);
  }
);

export const saveColumns = createAsyncThunk(
  "name/saveColumnsToStorage",
  (columns: IColumn[]) => {
    store.setColumns(columns);
    return columns;
  }
);

export const clearColumns = createAsyncThunk(
  "name/clearColumnsFromStorage",
  () => {
    store.removeName();
  }
);

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addColumns.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(saveColumns.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(clearColumns.fulfilled, (state) => {
      state.columns = [];
    });
  },
});

export const selectName = (state: RootState) => state.name;

export default columnsSlice.reducer;
