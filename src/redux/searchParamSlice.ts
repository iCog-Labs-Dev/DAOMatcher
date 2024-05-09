import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export interface SearchParams {
  query: string;
  user_list: string[];
  user_limit: number;
  depth: number;
  userId: string;
}

const initialState: SearchParams = {
  query: "",
  user_list: [],
  user_limit: 0,
  depth: 0,
  userId: "",
};

const searchParamSlice = createSlice({
  name: "searchParameters",
  initialState,
  reducers: {
    addSearchParam: (state, action) => {
      console.log("Adding search param: ", action.payload);
      if (action.payload) {
        state.query = action.payload.query;
        state.user_list = action.payload.user_list;
        state.user_limit = action.payload.user_limit;
        state.depth = action.payload.depth;
        state.userId = action.payload.userId;
      } else {
        console.log(
          "Invalid payload received while adding user state in userSlice"
        );
      }
    },
    clearSearchParam: (state) => {
      state.query = initialState.query;
      state.user_list = initialState.user_list;
      state.user_limit = initialState.user_limit;
      state.depth = initialState.depth;
      state.userId = initialState.userId;
    },
  },
});
export const selectSearchParams = (state: RootState) => state.searchParameters;
export const { addSearchParam, clearSearchParam } = searchParamSlice.actions;

export default searchParamSlice.reducer;
