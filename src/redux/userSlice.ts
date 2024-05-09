import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import LoginData from "@/types/LoginData";

const initialState: LoginData = {
  token: "",
  isLoggedIn: false,
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
      if (action.payload) {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      } else {
        console.log(
          "Invalid payload received while adding user state in userSlice"
        );
      }
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});
export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export const { addUser, updateToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
