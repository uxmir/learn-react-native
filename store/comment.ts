import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../constants/api";
interface commentData {
  _id: string | null;
  user: string | null;
  blog: string | null;
  comment: string | null;
  createdAt: string;
}

interface commentState {
  allComments: commentData[];
  error: string | null;
  loading: boolean;
}
const initialState: commentState = {
  allComments: [],
  error: null,
  loading: false,
};

export const createComment = createAsyncThunk(
  "comment/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/v3/comment/create`, payload);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data.message || error?.message;
      return rejectWithValue(message);
    }
  },
);

export const updateComment = createAsyncThunk(
  "comment/update",
  async (
    { id, payload }: { id: number; payload: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/api/v3/comment/update/${id}`, payload);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data.message || error?.message;
      return rejectWithValue(message);
    }
  },
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createComment.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allComments = [action.payload?.comments, ...state.allComments];
          state.error = null;
        },
      )
      .addCase(
        createComment.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      )
      .addCase(updateComment.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateComment.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allComments = state.allComments?.map((comment: any) =>
            comment._id === action.payload?.updateComment._id
              ? action.payload?.updateComment
              : comment,
          );
          state.error = null;
        },
      )
      .addCase(
        updateComment.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});
export default commentSlice.reducer;
