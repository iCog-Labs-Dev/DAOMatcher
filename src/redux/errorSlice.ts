import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface ErrorState {
  messages: string[];
}

const initialState: ErrorState = {
  messages: [],
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addError: (state, action) => {
      state.messages.push(action.payload);
    },
    clearError: (state) => {
      state.messages = [];
    },
  },
});
export const selectAllErrors = (state: RootState) => state.errors.messages;
export const { addError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
