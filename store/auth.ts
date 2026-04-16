import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface userProfile {
  _id: string;
  name: string;
  email: string;
  answer: string;
}

interface authState {
  user: userProfile | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: authState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

//api logic
export const register = createAsyncThunk(
  "auth/register",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BLOG_URL}/api/v1/auth/register`,
        formData,
      );
      if (response?.data?.success && response?.data?.token) {
        await SecureStore.setItemAsync("token", response?.data?.token);
      }
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
export const login = createAsyncThunk(
  "auth/login",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BLOG_URL}/api/v1/auth/login`,
        formData,
      );
      if (response?.data?.success && response?.data?.token) {
        await SecureStore.setItemAsync("token", response?.data?.token);
      }
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (password: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BLOG_URL}/api/v1/auth/reset-password`,
        password,
      );
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (password: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BLOG_URL}/api/v1/auth/update-password`,
        password,
      );
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      return rejectWithValue(message);
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      SecureStore.deleteItemAsync("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: any) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.token = null;
      })
      .addCase(register.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.error = null;
      })
      .addCase(register.rejected, (state: any, action: PayloadAction<any>) => {
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      //login
      .addCase(login.pending, (state: any) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.token = null;
      })
      .addCase(login.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.error = null;
      })
      .addCase(login.rejected, (state: any, action: PayloadAction<any>) => {
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      //reset-password
      .addCase(resetPassword.pending, (state: any) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.user = action.payload?.user;
          state.error = null;
        },
      )
      .addCase(
        resetPassword.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.user = null;
          state.error = action.payload as string;
        },
      )
      //update-password
      .addCase(updatePassword.pending, (state: any) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(
        updatePassword.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.user = action.payload?.user;
          state.error = null;
        },
      )
      .addCase(
        updatePassword.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.user = null;
          state.error = action.payload as string;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
