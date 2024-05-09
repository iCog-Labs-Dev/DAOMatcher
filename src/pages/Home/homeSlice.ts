import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";

export interface HomeState {
  connect: boolean;
  disconnect: boolean;
  isLoggedIn: boolean;
  isTokenRefreshed: boolean;
  isLoading: boolean;
  success: boolean;
  progress: number;
  error: string | null;
  handle: string[];
  handleInput: string;
}

const initialState: HomeState = {
  connect: true,
  disconnect: false,
  isLoggedIn: false,
  isTokenRefreshed: false,
  isLoading: false,
  success: false,
  progress: 0,
  error: null,
  handle: [],
  handleInput: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setConnect(state, action) {
      state.connect = action.payload;
      state.disconnect = !action.payload;
    },
    setDisconnect(state, action) {
      state.disconnect = action.payload;
      state.connect = !action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setIsTokenRefreshed(state, action) {
      state.isTokenRefreshed = action.payload;
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
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setHandle(state, action) {
      state.handle = action.payload;
    },
    setHandleInput(state, action) {
      state.handleInput = action.payload;
    },
  },
});
export const selectAllHomeStates = (state: RootState) => state.home;

export const {
  setConnect,
  setDisconnect,
  setIsLoggedIn,
  setIsTokenRefreshed,
  setIsLoading,
  setSuccess,
  setProgress,
  setError,
  clearError,
  setHandle,
  setHandleInput,
} = homeSlice.actions;
export default homeSlice.reducer;
