import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../constants/api";

interface likeData {
  _id: string | null;
  user: string | null;
  blog: string | null;
  comment: string | null;
  createdAt:string | null
}
interface likeState {
  likes: likeData[];
  likeCount: number | null;
  error: string | null;
  loading: boolean;
}

const initialState: likeState = {
  likes: [],
  likeCount: 0,
  error: null,
  loading: false,
};
//all api is here
export const createLike = createAsyncThunk(
  "like/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v5/like", payload);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
//getallApi
export const getLikes = createAsyncThunk(
  "like/getAll",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v5/like/likeall/${id}`);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLike.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createLike.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.likes = action?.payload?.createLike;
          state.error = null;
        },
      )
      .addCase(
        createLike.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      )
      .addCase(getLikes.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLikes.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.likes = action?.payload?.allLikes;
        state.likeCount = action?.payload?.likeCount;
        state.error = null;
      })
      .addCase(getLikes.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default likeSlice.reducer;
