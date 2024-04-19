import { useDispatch, useSelector } from "react-redux";
import { addError, clearError } from "@/redux/errorSlice";
import { setSuccess, selectAllHomeStates } from "@/pages/Home/homeSlice";
import { Response } from "@/pages/Home/Response";
import { BASE_URL } from "@/config/default";
import { useEffect, useState } from "react";
import {
  connectErrorHandler,
  connectHandler,
  connectionTimedOutErrorHandler,
  disconnectHandler,
  genericErrorHandler,
  getUsers,
  setCookieHandler,
  updateHandler,
} from "@/pages/Home/socketEventHandlers";
import { selectToken, selectUser } from "@/redux/userSlice";
import { Socket, io } from "socket.io-client";

interface ISocketProps {
  count: number;
  depth: number;
}

let socket: Socket | null = null;

const useSocket = ({ count, depth }: ISocketProps) => {
  const [socketState, setSocketState] = useState<Socket | null>(null);

  // Connect to the Socket.IO server
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  // const isLoading = useSelector(selectAllHomeStates).isLoading;
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!socket)
      socket = io(BASE_URL, {
        query: {
          token,
        },
      });
    setSocketState(socket);

    try {
      socket.on("connect", () => connectHandler(dispatch));
      socket.on("set_cookie", (userId: string) => setCookieHandler(userId));
      socket.on("connect_error", () => connectErrorHandler(dispatch));
      socket.on("search", (data: Response) => getUsers(dispatch, data, count));
      socket.on("something_went_wrong", (data) => {
        console.log("Error data found");
        return genericErrorHandler(dispatch, data);
      });
      socket.on("connect_timeout", () =>
        connectionTimedOutErrorHandler(dispatch)
      );
      socket.on("disconnect", () =>
        disconnectHandler(dispatch, socket, userData.id)
      );
      socket.on(`update`, (data) => updateHandler(dispatch, data, depth));
      socket.on("error", (error) => genericErrorHandler(dispatch, error));
    } catch (error) {
      console.log(error);
      if (error instanceof ErrorEvent)
        dispatch(addError(error.message ?? "Something went wrong"));
      dispatch(setSuccess(false));
      return;
    }

    return () => {
      disconnectHandler(dispatch, socket, userData.id);
      dispatch(clearError());
      socket = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BASE_URL]);

  return socketState;
};

export default useSocket;
