import { useDispatch, useSelector } from "react-redux";
import { addError, clearError } from "@/redux/errorSlice";
import { setConnect, setSuccess } from "@/pages/Home/homeSlice";
import { Response } from "@/pages/Home/Response";
import { socket as socketConnection } from "@/config/default";
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
import { useEffect, useRef } from "react";

interface ISocketProps {
  count: number;
  depth: number;
}

const useSocket = ({ count, depth }: ISocketProps) => {
  // Connect to the Socket.IO server
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  // const isConnected = useSelector(selectAllHomeStates).isConnected;
  const token = useSelector(selectToken);
  const socket = useRef(socketConnection);

  useEffect(() => {
    if (!socket.current) return;

    console.log("Socket.current connected", socket.current.connected);
    socket.current.io.opts.query = {
      token,
    };
    socket.current.connect();
    dispatch(setConnect(true));

    try {
      socket.current.on("connect", () => connectHandler(dispatch));
      socket.current.on("set_cookie", (userId: string) =>
        setCookieHandler(userId)
      );
      socket.current.on("connect_error", () => connectErrorHandler(dispatch));
      socket.current.on("search", (data: Response) =>
        getUsers(dispatch, data, count)
      );
      socket.current.on("something_went_wrong", (data) => {
        console.log("Error data found");
        return genericErrorHandler(dispatch, data);
      });
      socket.current.on("connect_timeout", () =>
        connectionTimedOutErrorHandler(dispatch)
      );
      socket.current.on("disconnect", () =>
        disconnectHandler(dispatch, socket.current, userData.id)
      );
      socket.current.on(`update`, (data) =>
        updateHandler(dispatch, data, depth)
      );
      socket.current.on("error", (error) =>
        genericErrorHandler(dispatch, error)
      );
    } catch (error) {
      console.log(error);
      if (error instanceof ErrorEvent)
        dispatch(addError(error.message ?? "Something went wrong"));
      dispatch(setSuccess(false));
      return;
    }

    return () => {
      // disconnectHandler(dispatch, socket.current, userData.id);
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return socket;
};

export default useSocket;
