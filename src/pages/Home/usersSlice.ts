import { createSlice } from "@reduxjs/toolkit";
import IUser from "pages/Home/IUser";
import { RootState } from "redux/store";

export interface UserState {
  users: IUser[];
}

const initialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
