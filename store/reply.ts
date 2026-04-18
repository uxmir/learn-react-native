import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../constants/api";

interface replyData {
  _id: string | null;
  user: string | null;
  blog: string | null;
  comment: string | null;
  reply: string | null;
  createdAt: string | null;
}

interface replyState {
  reply: replyData | null;
  error: string | null;
  loading: boolean;
}

const initialState: replyState = {
  reply: null,
  error: null,
  loading: false,
};

//api logic
export const createReply = createAsyncThunk(
  "reply/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/v4/reply/create`, payload);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);

export const updateReply = createAsyncThunk(
  "reply/update",
  async (
    { id, payload }: { id: number; payload: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/api/v4/reply/data/${id}`, payload);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReply.pending, (state: any) => {
        state.loading = true;
        state.reply = null;
        state.error = null;
      })
      .addCase( 
        createReply.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.reply = [action.payload?.createReply, ...state.reply];
          state.error = null;
        },
      )
      .addCase(
        createReply.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.reply = null;
          state.error = action.payload as string;
        },
      )
      //update
      .addCase(updateReply.pending, (state: any) => {
        state.loading = true;
        state.reply = null;
        state.error = null;
      })
      .addCase(
        updateReply.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.reply = state.reply?.map((r: any) =>
            r?._id === action.payload?.reply._id
              ? action.payload?.reply
              : r,
          );
          state.error = null;
        },
      )
      .addCase(
        updateReply.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.reply = null;
          state.error = action.payload as string;
        },
      );
  },
});

export default replySlice.reducer