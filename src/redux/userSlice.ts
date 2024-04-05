import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import LoginData from "@/types/LoginData";

const initialState: LoginData = {
  token: "",
  user: {
    api_key: "",
    display_name: "",
    email: "",
    id: "",
    settings: {},
    usage: {},
    verified: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
    },
    clearUser: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});
export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;

export const { addUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
