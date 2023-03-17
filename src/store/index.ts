import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import finderReducer from "../features/finder/finderSlice";
import filterReducer from "../features/filter/filterSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    finder: finderReducer,
    filter: filterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;