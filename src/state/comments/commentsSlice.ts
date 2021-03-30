import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../entities/Comment/IComment";
import store from "../../utils/store";
import { RootState } from "../store";

interface CommentsState {
  comments: Map<string, { comments: IComment[]; commentsCount: number }>;
}

const initialState: CommentsState = {
  comments: new Map(),
};

export const addComment = createAsyncThunk(
  "comments/addCommentToStorage",
  (data: { comment: string; taskId: string; columnId: string }, thunkAPI) => {
    store.addComment(data.comment, data.taskId, data.columnId);
    thunkAPI.dispatch(getComments());
  }
);

export const changeComment = createAsyncThunk(
  "comments/changeCommentInStorage",
  (
    data: {
      taskId: string;
      columnId: string;
      commentId: string;
      text: string;
    },
    thunkAPI
  ) => {
    store.changeComment(data.taskId, data.columnId, data.commentId, data.text);
    thunkAPI.dispatch(getComments());
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeCommentFromStorage",
  (data: { taskId: string; columnId: string; commentId: string }, thunkAPI) => {
    store.removeComment(data.taskId, data.columnId, data.commentId);
    thunkAPI.dispatch(getComments());
  }
);

export const getComments = createAsyncThunk(
  "comments/getCommentsFromStorage",
  () => {
    return store.getAllComments();
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addComment.fulfilled, () => {});
    builder.addCase(changeComment.fulfilled, () => {});
    builder.addCase(removeComment.fulfilled, () => {});
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export const selectComments = (state: RootState) => state.comments.comments;

export default commentsSlice.reducer;
