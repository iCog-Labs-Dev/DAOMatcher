/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertToCSV } from "@/utils/CSV";
import Cookies from "js-cookie";
import { selectAllUsers, setUsers } from "@/pages/Home/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setProgress, setSuccess } from "@/pages/Home/homeSlice";
import { setError, clearError } from "@/pages/Home/homeSlice";
import { addInfoMessage, clearInfoMessages } from "@/redux/infoSlice";
import { socket } from "@/config/default";

export const useHandleCancel = () => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setSuccess(false));
    if (socket) {
      const userId = Cookies.get("userId");
      socket.emit("stop", userId);
      console.log("Cancelled request");
      dispatch(addInfoMessage("Request canceled"));
      socket.disconnect();
    } else dispatch(addInfoMessage("Couldn't cancel request"));

    dispatch(setIsLoading(false));
    dispatch(setProgress(0));
  };

  return { handleCancel };
};

export const useHandleSubmit = (
  handle: string[],
  descriptionInput: string,
  count: any,
  depth: number
) => {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(setSuccess(false));
    dispatch(clearError());
    dispatch(clearInfoMessages());

    const requestBody = {
      handle,
      descriptionInput,
      count,
      depth,
    };
    console.log(requestBody);

    if (handle.length > 0 && descriptionInput != "") {
      //This line of code insures all handles are of Mastodon format
      const pattern =
        /^@[a-zA-Z0-9_!#$%^&*()+=\-[\]{}|\\:;"'<>,?/]+@[a-zA-Z0-9_!#$%^&*()+=\-[\]{}|\\:;"'<>,?/]+\.[a-zA-Z0-9_!#$%^&*()+=\-[\]{}|\\:;"'<>,?/]+$/;
      const isValid = handle.every((user) => {
        console.log("User: ", user, " Valid: ", pattern.test(user));

        return pattern.test(user);
      });

      if (!isValid) {
        dispatch(setError("User handles validation failed"));
        return;
      }

      dispatch(setIsLoading(true));
      dispatch(clearError());
      dispatch(clearInfoMessages());
      dispatch(setUsers([]));

      if (socket) {
        const userId = Cookies.get("userId");
        if (userId) {
          socket.emit("get_users", {
            query: descriptionInput,
            user_list: handle,
            user_limit: count,
            depth: depth,
            userId: userId,
          });
        } else {
          dispatch(setError("User session not found. Reload the page"));
          dispatch(setSuccess(false));
        }
      }
    } else {
      dispatch(setError("Empty handles or description!"));
      dispatch(setSuccess(false));
    }
  };

  return { handleSubmit };
};

export const useHandleDownload = () => {
  const users = useSelector(selectAllUsers);

  const handleDownloadClick = async () => {
    const csv = await convertToCSV(users);
    if (csv) {
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `user-data-${new Date().getTime()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return { handleDownloadClick };
};
