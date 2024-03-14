import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "pages/Home/homeSlice";
import usersReducer from "pages/Home/usersSlice";
import errorReducer from "redux/errorSlice";
import infoReducer from "redux/infoSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    errors: errorReducer,
    users: usersReducer,
    infoMessages: infoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
