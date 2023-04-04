import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import finderReducer from "../features/finder/finderSlice";
import filterReducer from "../features/filter/filterSlice";
// import {searchAPI} from '../features/finder/finderSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    finder: finderReducer,
    filter: filterReducer,
  },
/*   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchAPI.middleware),
 */  
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;