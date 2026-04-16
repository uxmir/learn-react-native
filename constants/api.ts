import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL:process.env.EXPO_PUBLIC_BLOG_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const userToken = await SecureStore.getItemAsync("token");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }
    return Promise.reject(error);
  },
);

export default api;
