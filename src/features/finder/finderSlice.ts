import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FinderState {
  jobs: Array<any>;
}

const initialState: FinderState = {
  jobs: [],
};

const finderSlice = createSlice({
  name: "finder",
  initialState,
  reducers: {
    loadJobs: (state, action: PayloadAction<Array<any>>) => {
      state.jobs = action.payload;
    },
  },
});

export const { loadJobs } = finderSlice.actions;
export default finderSlice.reducer;
