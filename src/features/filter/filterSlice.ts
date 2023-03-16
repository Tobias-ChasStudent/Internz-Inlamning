import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface filterSlice {
  filters: Array<any>;
}

const initialState: filterSlice = {
  filters: [
    // Temporary values for testing!
    {
      name: "category 1",
      items: [
        { tag: "tagname1", amount: 123, active: true },
        { tag: "tagname2", amount: 123, active: false },
        { tag: "tagname3", amount: 123, active: false },
      ],
    },
    {
      name: "category 2",
      items: [
        { tag: "tagname1", amount: 123, active: false },
        { tag: "tagname2", amount: 123, active: false },
        { tag: "tagname3", amount: 123, active: false },
      ],
    },
  ],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<any>) => {
      const curState =
        state.filters[action.payload.catIndex].items[action.payload.tagIndex]
          .active;
      state.filters[action.payload.catIndex].items[
        action.payload.tagIndex
      ].active = !curState;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
