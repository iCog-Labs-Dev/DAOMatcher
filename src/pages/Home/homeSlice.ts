import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "@/config/default";

import { RootState } from "@/redux/store";
import { Socket, io } from "socket.io-client";

export interface HomeState {
  isLoggedIn: boolean;
  isLoading: boolean;
  success: boolean;
  progress: number;
  socket: Socket;
}

const initialState: HomeState = {
  isLoggedIn: false,
  isLoading: false,
  success: false,
  progress: 0,
  socket: io(`${BASE_URL}`),
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setProgress(state, action) {
      state.progress = action.payload;
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
  },
});
export const selectAllHomeStates = (state: RootState) => state.home;

export const {
  setIsLoggedIn,
  setIsLoading,
  setSuccess,
  setProgress,
  setSocket,
} = homeSlice.actions;
export default homeSlice.reducer;
