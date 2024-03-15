import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";

export interface HomeState {
  isLoggedIn: boolean;
  isLoading: boolean;
  success: boolean;
  progress: number;
  error: string | null;
}

const initialState: HomeState = {
  isLoggedIn: false,
  isLoading: false,
  success: false,
  progress: 0,
  error: null,
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
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});
export const selectAllHomeStates = (state: RootState) => state.home;

export const {
  setIsLoggedIn,
  setIsLoading,
  setSuccess,
  setProgress,
  setError,
  clearError,
} = homeSlice.actions;
export default homeSlice.reducer;
