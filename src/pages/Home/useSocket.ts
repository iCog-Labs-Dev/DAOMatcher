import { useDispatch, useSelector } from "react-redux";
import { addError, clearError } from "@/redux/errorSlice";
import { setSuccess, selectAllHomeStates } from "@/pages/Home/homeSlice";
import { Response } from "@/pages/Home/Response";
import { socket } from "@/config/default";
import { useEffect } from "react";
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

interface ISocketProps {
  count: number;
  depth: number;
}

const useSocket = ({ count, depth }: ISocketProps) => {
  // Connect to the Socket.IO server
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAllHomeStates).isLoading;

  useEffect(() => {
    if (!socket) return;

    try {
      socket.on("connect", () => connectHandler());
      socket.on("set_cookie", (userId: string) => setCookieHandler(userId));
      socket.on("connect_error", () => connectErrorHandler(dispatch));
      socket.on("get_users", (data: Response) =>
        getUsers(dispatch, data, count)
      );
      socket.on("something_went_wrong", (data) =>
        genericErrorHandler(dispatch, data)
      );
      socket.on("connect_timeout", () =>
        connectionTimedOutErrorHandler(dispatch)
      );
      socket.on("disconnect", () => disconnectHandler(dispatch, socket));
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
      disconnectHandler(dispatch, socket);
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
};

export default useSocket;
