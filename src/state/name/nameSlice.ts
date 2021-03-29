import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store from "../../utils/store";
import { RootState } from "../store";

interface NameState {
  name: string | null;
}

const initialState: NameState = {
  name: null,
};

export const saveName = createAsyncThunk(
  "name/saveNameToStorage",
  (name: string) => {
    store.setName(name);
    return name;
  }
);

export const clearName = createAsyncThunk("name/removeNameFromStorage", () => {
  store.removeName();
});

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveName.fulfilled, (state, action) => {
      state.name = action.payload;
    });
    builder.addCase(clearName.fulfilled, (state) => {
      state.name = null;
    });
  },
});

export const selectName = (state: RootState) => state.name;

export default nameSlice.reducer;
