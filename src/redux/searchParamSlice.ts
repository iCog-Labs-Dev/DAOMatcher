import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export interface SearchParams {
  query: string;
  user_list: string[];
  user_limit: number;
  depth: number;
  userId: string;
}

interface SearchSlice {
  resubmitCount: number;
  searchParam: SearchParams;
}

const initialState: SearchSlice = {
  searchParam: {
    query: "",
    user_list: [],
    user_limit: 0,
    depth: 0,
    userId: "",
  },
  resubmitCount: 0,
};

const searchParamSlice = createSlice({
  name: "searchParameters",
  initialState,
  reducers: {
    addSearchParam: (state, action) => {
      console.log("Adding search param: ", action.payload);
      if (action.payload) {
        state.searchParam.query = action.payload.query;
        state.searchParam.user_list = action.payload.user_list;
        state.searchParam.user_limit = action.payload.user_limit;
        state.searchParam.depth = action.payload.depth;
        state.searchParam.userId = action.payload.userId;
      } else {
        console.log(
          "Invalid payload received while adding user state in userSlice"
        );
      }
    },
    incrementResubmitCount: (state) => {
      state.resubmitCount += 1;
    },
    clearSearchParam: (state) => {
      state.searchParam.query = initialState.searchParam.query;
      state.searchParam.user_list = initialState.searchParam.user_list;
      state.searchParam.user_limit = initialState.searchParam.user_limit;
      state.searchParam.depth = initialState.searchParam.depth;
      state.searchParam.userId = initialState.searchParam.userId;
      state.resubmitCount = 0;
    },
  },
});
export const selectSearchParams = (state: RootState) =>
  state.searchParameters.searchParam;
export const selectResubmitCount = (state: RootState) =>
  state.searchParameters.resubmitCount;
export const { addSearchParam, clearSearchParam, incrementResubmitCount } =
  searchParamSlice.actions;

export default searchParamSlice.reducer;
