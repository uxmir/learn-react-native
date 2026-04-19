import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../constants/api";

interface dislikeData {
  _id: string | null;
  user: string | null;
  blog: string | null;
  comment: string | null;
  createdAt: string | null;
}

interface dislikeState {
  dislikes: dislikeData[];
  dislikeCount: number | null;
  error: string | null;
  loading: boolean;
}

const initialState: dislikeState = {
  dislikes: [],
  dislikeCount: 0,
  error: null,
  loading: false,
};

//all api is here
export const createDisLike = createAsyncThunk(
  "dislike/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v6/dislike", payload);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
//getallApi
export const getDisLikes = createAsyncThunk(
  "dislike/getAll",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v6/dislike/dislikeall/${id}`);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);

const dislikeSlice = createSlice({
  name: "dislike",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDisLike.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDisLike.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.dislikes = action?.payload?.createDisLike;
          state.error = null;
        },
      )
      .addCase(
        createDisLike.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      )
      .addCase(getDisLikes.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDisLikes.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.dislikes = action?.payload?.allDisLikes;
          state.dislikeCount = action?.payload?.dislikeCount;
          state.error = null;
        },
      )
      .addCase(
        getDisLikes.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      );
  },
});

export default dislikeSlice.reducer