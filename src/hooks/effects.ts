/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { IUser, Response } from "../Components/Body/Body";

export const useSocket = (
  depth: any,
  isLoading: boolean,
  setSocket: React.Dispatch<React.SetStateAction<Socket<any, any> | undefined>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<any>,
  setJsonData: React.Dispatch<React.SetStateAction<IUser[]>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    // Connect to the Socket.IO server

    try {
      const socket = io(`https://daomatcher-backend.onrender.com`);
      setSocket(socket);

      socket.on("connect", () => {
        console.log("Connected to the Socket.IO server");
      });

      socket.on("connect_error", () => {
        console.log("Couldn't establish connection to server");
      });

      socket.on("get_users", (data: Response) => {
        setIsLoading(false);
        console.log("Updating completed");

        console.log(data); //For debugging only

        const { result: users } = data;
        users.sort((a, b) => b.score - a.score);

        setUsers(users);
        setSuccess(true);
        setError(null);
        setJsonData(users);
      });

      socket.on("something_went_wrong", (data) => {
        console.log("Error: ", data);
        setError(data.message ?? "Something went wrong");
        setSuccess(false);
      });

      socket.on("connect_timeout", () => {
        console.log("Connection timed out");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from the Socket.IO server");
      });

      socket.on(`update`, (data) => {
        console.log("Update recieved");
        try {
          console.log("recieved data: ", data);

          const { progress: tempProgress, curr_user: user } = data;

          if (!tempProgress) {
            console.log(data.error);
          } else {
            console.log("tempProgress: ", tempProgress);
            console.log("user: ", user);

            const percentage = (tempProgress / depth) * 100;
            setProgress(percentage);
          }
        } catch (error) {
          console.log(error);
          if (error instanceof ErrorEvent) setError(error.message);
          else setError("Something went wrong connecting to socket io");
          setSuccess(false);
        }
      });

      socket.on("error", (error) => {
        console.log("Error: ", error);
        setError(error.message ?? "Something went wrong");
        setSuccess(false);
      });

      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.log(error);
      if (error instanceof ErrorEvent)
        setError(error.message ?? "Something went wrong");
      setSuccess(false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
};
