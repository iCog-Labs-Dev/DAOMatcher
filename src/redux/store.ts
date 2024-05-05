import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homeReducer from "@/pages/Home/homeSlice";
import usersReducer from "@/pages/Home/usersSlice";
import userReducer from "@/redux/userSlice";
import errorReducer from "@/redux/errorSlice";
import infoReducer from "@/redux/infoSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  home: homeReducer,
  errors: errorReducer,
  users: usersReducer,
  infoMessages: infoReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
