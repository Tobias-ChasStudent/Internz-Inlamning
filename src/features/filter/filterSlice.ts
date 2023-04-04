import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface filterSlice {
  filters: Array<any>;
  searchTerm: string;
  error: { isError: boolean; errorMessage: string };
}

type FilterItems = { tag: string; active: boolean };

const initialState: filterSlice = {
  filters: [
    /* 
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
    }, */
  ],
  searchTerm: "",
  error: { isError: false, errorMessage: "" },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setAllFilters: (state, action: PayloadAction<any>) => {
      const filters = action.payload;
      console.log(filters);

      const newArray = filters.map(
        (category: { name: string; items: Array<FilterItems> }) =>
          new Object({ name: category.name, items: category.items.map((item) => new Object({ tag: item, active: false })) })
      );
      state.filters = newArray;
    },
    setFilter: (state, action: PayloadAction<any>) => {
      const curState =
        state.filters[action.payload.catIndex].items[action.payload.tagIndex]
          .active;
      state.filters[action.payload.catIndex].items[
        action.payload.tagIndex
      ].active = !curState;
    },
    clearAllFilters: (state) => {
      state.filters.forEach((category) =>
        category.items.forEach((item: FilterItems) => (item.active = false))
      );
    },
    clearFilterCategory: (
      state,
      action: PayloadAction<{ catIndex: number }>
    ) => {
      state.filters[action.payload.catIndex].items.forEach(
        (item: FilterItems) => (item.active = false)
      );
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload.trim();
    },
    RemoveSearchTerm: (state) => {
      state.searchTerm = "";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error.errorMessage = action.payload;
      state.error.isError = true;
    },
  },
});

export const {
  setAllFilters,
  setFilter,
  clearAllFilters,
  clearFilterCategory,
  setSearchTerm,
  RemoveSearchTerm,
  setError,
} = filterSlice.actions;
export default filterSlice.reducer;
