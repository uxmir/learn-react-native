import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../constants/api";
interface blogData {
  _id: string | null;
  user:string | null
  image:string | null
  title: string | null;
  text: string | null;
  createdAt:string | null
}
interface commentData {
  _id: string | null;
  user: string | null;
  blog: string | null;
  comment: string | null;
  createdAt:string
}

interface blogState {
  allBlogs: blogData[];
  singleBlog: blogData | null;
  totalBlogs: number;
  currentPage: number;
  totalPage: number;
  allComments: commentData[];
  error: string | null;
  loading: boolean;
}

const initialState: blogState = {
  allBlogs: [],
  singleBlog: null,
  totalBlogs: 0,
  currentPage: 1,
  totalPage: 1,
  allComments: [],
  error: null,
  loading: false,
};
/*================
all api logic
================== */
export const createBlog = createAsyncThunk(
  "blog/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/v2/blog/create`, payload);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
//get all
export const getAllBlog = createAsyncThunk(
  "blog/getAll",
  async (
    params: { keyword?: string; page?: number; perPage?: number } | null,
    { rejectWithValue },
  ) => {
    try {
      const response = await api.get("/api/v2/blog/getdataall", {
        params: params || undefined,
      });
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
//get single
export const getSingle = createAsyncThunk(
  "blog/getSingle",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v2/blog/data/${id}`);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
//updateSingle
export const updateBlog = createAsyncThunk(
  "blog/updateSingle",
  async (
    { id, payload }: { id: number; payload: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/api/v2/blog/update/${id}`, payload);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data.message || error?.message;
      return rejectWithValue(message);
    }
  },
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/v2/blog/delete/${id}`);
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //createblog
      .addCase(createBlog.pending, (state: any) => {
        state.loading = true;
        state.allBlogs = [];
        state.error = null;
      })
      .addCase(
        createBlog.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allBlogs = [action.payload?.createBlog, ...state.allBlogs];
          state.error = null;
        },
      )
      .addCase(
        createBlog.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allBlogs = [];
          state.error = action.payload as string;
        },
      )
      //getAllblog
      .addCase(getAllBlog.pending, (state: any) => {
        state.loading = true;
        state.allBlogs = [];
        state.currentPage = 1;
        state.totalPage = 1;
        state.totalBlogs = 0;
        state.error = null;
      })
      .addCase(
        getAllBlog.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allBlogs = action.payload?.allBlogs;
          state.currentPage = action.payload?.currentPage;
          state.totalPage = action.payload?.totalPages;
          state.error = null;
        },
      )
      .addCase(
        getAllBlog.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allBlogs = [];
          state.currentPage = 1;
          state.totalPage = 1;
          state.totalBlogs = 0;
          state.error = action.payload as string;
        },
      )
      //getsingleblog
      .addCase(getSingle.pending, (state: any) => {
        state.loading = true;
        state.singleBlog = null;
        state.allComments = [];
        state.error = null;
      })
      .addCase(
        getSingle.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.singleBlog = action.payload?.singleBlog;
          state.allComments = action.payload?.allComments;
          state.error = null;
        },
      )
      .addCase(getSingle.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.singleBlog = action.payload?.singleBlog;
        state.allComments = action.payload?.allComments;
        state.error = action.payload as string;
      })
      //updatesingleblog
      .addCase(updateBlog.pending, (state: any) => {
        state.loading = true;
        state.allBlogs = [];
        state.singleBlog = null;
        state.error = null;
      })
      .addCase(
        updateBlog.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allBlogs = state.allBlogs?.map((blog: any) =>
           blog._id === action.payload?.updateBlog?._id ? action.payload?.updateBlog : blog,
          );
          state.singleBlog = action.payload?.updateBlog;
          state.error = null;
        },
      )
      .addCase(
        updateBlog.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allBlogs = [];
          state.singleBlog = null;
          state.error = action.payload as string;
        },
      )
      //delete
      .addCase(deleteBlog.pending, (state: any) => {
        state.loading = true;
        state.allBlogs = [];
        state.singleBlog = null;
        state.error = null;
      })
      .addCase(
        deleteBlog.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allBlogs = state.allBlogs?.filter(
            (blog: any) => blog._id !== action.payload?.deleteBlog?._id,
          );
          state.singleBlog = null;
          state.error = null;
        },
      )
      .addCase(
        deleteBlog.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.allBlogs = [];
          state.singleBlog = null;
          state.error = action.payload as string;
        },
      );
  },
});

export default blogSlice.reducer;
