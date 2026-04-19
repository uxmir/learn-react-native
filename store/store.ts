import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import blogReducer from "./blog";
import commentReducer from "./comment";
import replyReducer from "./reply";
import likeReducer from './like';
import dislikeReducer from './dislike'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    comment: commentReducer,
    reply: replyReducer,
    like:likeReducer,
    dislike:dislikeReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
