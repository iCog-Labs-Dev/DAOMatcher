import Cookies from "js-cookie";
import { Dispatch, MutableRefObject } from "react";
import { addError, clearError } from "@/redux/errorSlice";
import {
  setSuccess,
  setIsLoading,
  setProgress,
  setConnect,
  setIsLoggedIn,
} from "@/pages/Home/homeSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import { UpdateData, Response } from "@/pages/Home/Response";
import { setUsers } from "@/pages/Home/usersSlice";
import { addInfoMessage } from "@/redux/infoSlice";
import SocketError, { isSocketError } from "@/types/SocketError";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/config/default";
import { clearUser, updateToken } from "@/redux/userSlice";

export const connectHandler = (dispatch: Dispatch<UnknownAction>) => {
  console.log("Connected to the Socket.IO server");
  dispatch(clearError());
  dispatch(setConnect(true));
};

export const refreshHandler = (dispatch: Dispatch<UnknownAction>) => {
  const errorUpdates = (message: string) => {
    dispatch(addError(message));
    dispatch(setIsLoggedIn(false));
    dispatch(clearUser());
    dispatch(setConnect(false));
  };

  console.log("Refreshing token");
  axios
    .get(`${BASE_URL}/api/auth/refresh`, { withCredentials: true })
    .then((data) => {
      const { token, success, message } = data.data;
      if (success) {
        dispatch(updateToken(token));
        dispatch(setConnect(true));
        console.log("Token refreshed");
      } else {
        errorUpdates(message);
      }
    })
    .catch((error) => {
      if (error instanceof AxiosError)
        dispatch(addError("Session expired. Please login again."));
      else errorUpdates("Something went wrong. Please login again");

      dispatch(setIsLoggedIn(false));
      dispatch(clearUser());
      dispatch(setConnect(false));
    });
};

export const setCookieHandler = (userId: string) => {
  Cookies.set("userId", userId, { secure: true, sameSite: "none" });
  console.log("Setting cookies done");
};
export const getUsers = (
  dispatch: Dispatch<UnknownAction>,
  data: Response,
  count: number
) => {
  dispatch(setIsLoading(false));
  dispatch(setConnect(false));

  console.log("Updating completed");
  console.log(data); //For debugging only

  const { result } = data;
  const users = [...result];
  users.sort((a, b) => b.score - a.score);

  //Additional checking to find if all users have been found
  const foundAllUsers = users.length === count;
  dispatch(setUsers(users));
  dispatch(setSuccess(true));

  if (!foundAllUsers && users.length > 0)
    dispatch(
      addInfoMessage(
        `Found only ${users.length} users instead of ${count} users`
      )
    );

  setProgress(0);
};

export const disconnectHandler = (dispatch: Dispatch<UnknownAction>) => {
  Cookies.remove("userId");
  dispatch(setProgress(0));
  dispatch(setIsLoading(false));
  dispatch(setConnect(false));
  console.log("Disconnected from the Socket.IO server");
};

export const connectErrorHandler = (dispatch: Dispatch<UnknownAction>) => {
  const message: string = "Couldn't establish connection to server";
  console.log(message);
  dispatch(addError(message));
  dispatch(setSuccess(false));
  dispatch(setIsLoading(false));
};

export const updateHandler = (
  dispatch: Dispatch<UnknownAction>,
  data: UpdateData,
  depth: MutableRefObject<number>
) => {
  console.log("Update received");

  try {
    console.log("received data: ", data);

    const { progress: tempProgress, curr_user: user } = data;

    if (!tempProgress) {
      console.log(data.error);
    } else {
      console.log("tempProgress: ", tempProgress);
      console.log("user: ", user);
      console.log("depth: ", depth);

      const percentage = (tempProgress / depth.current) * 100;
      dispatch(setProgress(percentage));
    }
  } catch (error) {
    let message = "";
    console.log(error);
    if (error instanceof ErrorEvent) message = error.message;
    else message = "Something went wrong while connecting to socket io";
    setSuccess(false);
    dispatch(addError(message));
  }
};

const errorHandler = (
  dispatch: Dispatch<UnknownAction>,
  message: string,
  error?: unknown
) => {
  console.log("Error: ", error);
  dispatch(addError(message));
  dispatch(setSuccess(false));
  dispatch(setIsLoading(false));
  dispatch(setProgress(0));
};

export const genericErrorHandler = (
  dispatch: Dispatch<UnknownAction>,
  error?: ErrorEvent | Error | SocketError | unknown
) => {
  let message: string | null = null;
  if (error instanceof ErrorEvent || error instanceof Error)
    message = error.message;
  else if (isSocketError(error as SocketError))
    dispatch(addInfoMessage((error as SocketError).message));
  else message = "Something went wrong while connecting to socket io";

  if (message != null) errorHandler(dispatch, message, error);
};

export const connectionTimedOutErrorHandler = (
  dispatch: Dispatch<UnknownAction>
) => {
  console.log("Connection timed out");
  errorHandler(dispatch, "Connection timed out");
};
