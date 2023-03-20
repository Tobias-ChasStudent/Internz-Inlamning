import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  users: Array<any>;
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUsers: (state, action: PayloadAction<Array<any>>) => {
      state.users = action.payload;
    },
  },
});

export const { loadUsers } = userSlice.actions;
export default userSlice.reducer;