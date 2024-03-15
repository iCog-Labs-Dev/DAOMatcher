import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface InfoState {
  messages: string[];
}

const initialState: InfoState = {
  messages: [],
};

const infoSlice = createSlice({
  name: "information",
  initialState,
  reducers: {
    addInfoMessage: (state, action) => {
      if (!state.messages.includes(action.payload))
        state.messages.push(action.payload);
    },
    clearInfoMessages: (state) => {
      state.messages = [];
    },
  },
});
export const selectAllInfoMessages = (state: RootState) =>
  state.infoMessages.messages;
export const { addInfoMessage, clearInfoMessages } = infoSlice.actions;

export default infoSlice.reducer;
