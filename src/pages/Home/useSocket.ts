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
  refreshHandler,
  setCookieHandler,
  updateHandler,
} from "@/pages/Home/socketEventHandlers";
import { selectToken, selectUser } from "@/redux/userSlice";
import { MutableRefObject, useEffect, useRef } from "react";
interface ISocketProps {
  count: number;
  depth: MutableRefObject<number>;
}

const useSocket = ({ count, depth }: ISocketProps) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userData = useSelector(selectUser);
  const socket = useRef(socketConnection);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.io.opts.query = {
      token,
    };
    socket.current.connect();
    dispatch(setConnect(true));

    try {
      socket.current.on("connect", () => {
        connectHandler(dispatch);
        console.log("connection id", socket.current.id);
      });
      socket.current.on("refresh_token", (data) => {
        console.log("refresh token event fired with data: ", data);
        refreshHandler(dispatch, socket, userData.id);
        return;
      });
      socket.current.on("set_cookie", (userId: string) =>
        setCookieHandler(userId)
      );
      socket.current.on("connect_error", (err) => {
        console.log("Connection Error: ", err);
        connectErrorHandler(dispatch)
      });;
      socket.current.on("search", (data: Response) =>
        getUsers(dispatch, data, count)
      );
      socket.current.on("something_went_wrong", (data) => {
        console.log("Error data found");
        return genericErrorHandler(dispatch, data);
      });
      socket.current.on("search_error", (data) => {
        console.log("Error found after completed searching");
        return genericErrorHandler(dispatch, data);
      });
      socket.current.on("connect_timeout", () =>
        connectionTimedOutErrorHandler(dispatch)
      );
      socket.current.on("disconnect", () => disconnectHandler(dispatch));
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
      socket.current.off();
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return socket;
};

export default useSocket;
