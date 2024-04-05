import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "@/pages/Home/homeSlice";
import usersReducer from "@/pages/Home/usersSlice";
import userReducer from "@/redux/userSlice";
import errorReducer from "@/redux/errorSlice";
import infoReducer from "@/redux/infoSlice";

const store = configureStore({
  reducer: {
    home: homeReducer,
    errors: errorReducer,
    users: usersReducer,
    infoMessages: infoReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
