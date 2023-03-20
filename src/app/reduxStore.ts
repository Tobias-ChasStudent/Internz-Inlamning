import { configureStore } from "@reduxjs/toolkit";
import finderReducer from "../features/finder/finderSlice";
import filterReducer from "../features/filter/filterSlice";

const store = configureStore({
  reducer: {
    finder: finderReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
