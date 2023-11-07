import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import User from "./User/User";
import AddIcon from "@mui/icons-material/Add";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import Alert from "@mui/material/Alert";
import CircularProgressWithLabel from "./CircularProgressWithLabel/CircularProgressWithLabel";
import { Navigate } from "react-router-dom";
import {
  useAddHandler,
  useChangeHandleInput,
  useDeleteHandle,
  useHandleCancel,
  useHandleDepthChange,
  useHandleDownload,
  useHandleSubmit,
} from "../../hooks/buttonHandlerHooks";
import { BASE_URL } from "../../config/default";
import Cookies from "js-cookie";

export interface IUser {
  id: string;
  username: string;
  name: string;
  score: number;
  handle: string;
  image: string;
}

export interface Response {
  result: IUser[];
}

function valuetext(value: number) {
  return `${value}°C`;
}

function Body({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const initialUserState = JSON.parse(
    localStorage.getItem("users") || "[]"
  ) as IUser[];
  const [users, setUsers] = useState<IUser[]>(initialUserState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [count, setCount] = useState<any>(10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [progress, setProgress] = useState<number>(0);
  const initialLoadingState = localStorage.getItem("isLoading") === "true";
  const [isLoading, setIsLoading] = useState(initialLoadingState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");
  // const [estimation, setEstimation] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socket, setSocket] = useState<Socket<any, any>>();
  const { setJsonData, handleDownloadClick } = useHandleDownload();
  const { depth, setDepth, handleDepthChange } = useHandleDepthChange();
  const { handle, handleInput, setHandle, setHandleInput, addHandler } =
    useAddHandler();
  const { handleSubmit } = useHandleSubmit(
    handle,
    descriptionInput,
    count,
    depth,
    socket,
    setIsLoading,
    setError,
    setUsers,
    setSuccess
  );

  const { handleCancel } = useHandleCancel(
    setSuccess,
    setInfo,
    socket,
    setIsLoading,
    setProgress
  );

  const { changeHandleInput } = useChangeHandleInput(
    setError,
    addHandler,
    setHandleInput
  );

  const { deleteHandle } = useDeleteHandle(handle, setHandle);

  useEffect(() => {
    localStorage.setItem("isLoading", isLoading.toString());
  }, [isLoading]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    // Connect to the Socket.IO server

    try {
      const socket = io(`${BASE_URL}`);
      setSocket(socket);
      console.log(socket.connected);
      socket.on("connect", () => {
        console.log("Connected to the Socket.IO server");
        setError(null);
      });

      socket.on("set_cookie", (userId: string) => {
        Cookies.set("userId", userId, { secure: true, sameSite: "none" });
        console.log("Setting cookies done");
      });

      socket.on("connect_error", () => {
        console.log("Couldn't establish connection to server");
        setError("Couldn't establish connection to server");
        setSuccess(false);
        setIsLoading(false);
      });

      socket.on("get_users", (data: Response) => {
        setIsLoading(false);
        console.log("Updating completed");

        console.log(data); //For debugging only

        const { result: users } = data;
        users.sort((a, b) => b.score - a.score);

        //Additional checking to find if all users have been found
        const foundAllUsers = users.length === count;
        setUsers(users);
        setSuccess(true);
        setInfo(
          !foundAllUsers && users.length > 0
            ? `Found only ${users.length} users instead of ${count} users`
            : ""
        );
        setJsonData(users);
        setProgress(0);
      });

      socket.on("something_went_wrong", (data) => {
        console.log("Error: ", data);
        setError(data.message ?? "Something went wrong");
        setSuccess(false);
        setIsLoading(false);
        setProgress(0);
      });

      socket.on("connect_timeout", () => {
        console.log("Connection timed out");
        setError("Connection timed out");
        setSuccess(false);
        setIsLoading(false);
        setProgress(0);
      });

      socket.on("disconnect", () => {
        const userId = Cookies.get("userId");
        Cookies.remove("userId");
        console.log("Disconnected from the Socket.IO server");
        setError(null);
        setProgress(0);
        socket.emit("remove", userId);
      });

      socket.on(`update`, (data) => {
        console.log("Update recieved");
        setError(null);

        try {
          console.log("recieved data: ", data);

          const { progress: tempProgress, curr_user: user } = data;

          if (!tempProgress) {
            console.log(data.error);
          } else {
            console.log("tempProgress: ", tempProgress);
            console.log("user: ", user);
            console.log("depth: ", depth);

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
        setIsLoading(false);
        setProgress(0);
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
  }, [isLoading ? success : isLoading, depth]);

  // useEffect(() => {
  //   const milliseconds = depth * 3474;
  //   const timeString = formatTime(milliseconds);

  //   setEstimation(timeString);
  // }, [depth]);

  useEffect(() => {
    if (users.length === 0 && success) setIsLoading(false);
  }, [users, success]);

  if (!isLoggedIn) {
    return <Navigate to="/DAOMatcher/login" />;
  }

  return (
    <center>
      <Container maxWidth="lg">
        <Box sx={{ margin: "5rem 0" }}>
          <Container maxWidth="md">
            <Typography variant="h5">
              Search for people with similar interests
            </Typography>
            {error ? (
              <Alert
                severity="error"
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                {error}
              </Alert>
            ) : null}
            {users.length === 0 && success ? (
              <Alert
                severity="error"
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                No users found with this account
              </Alert>
            ) : null}
            {success && info && !error ? (
              <Alert
                severity="info"
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                {info}
              </Alert>
            ) : null}
            {success && users.length > 0 && !error ? (
              <Alert
                severity="success"
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                Loading successful. Click the download icon to save the result.
              </Alert>
            ) : null}

            <Box sx={{ height: "2rem" }} />
            <Stack direction="row">
              <TextField
                id="outlined-basic"
                label="Mastodon User handles"
                variant="outlined"
                fullWidth
                onChange={changeHandleInput}
                value={handleInput}
                onKeyDown={changeHandleInput}
                onBlur={addHandler}
                size="small"
                placeholder="@MarkRuffalo@mastodon.social"
              />
              <IconButton
                aria-label="delete"
                size="medium"
                onClick={addHandler}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Stack>
            <Box sx={{ margin: "1rem 0" }}>
              {handle.length ? (
                handle.map((h, i) => (
                  <Chip
                    label={h}
                    key={i}
                    onDelete={() => deleteHandle(h)}
                    sx={{ margin: "0.5rem" }}
                  />
                ))
              ) : (
                <Typography variant="body2">
                  Handle list will appear here
                </Typography>
              )}
            </Box>
            <Box sx={{ height: "1rem" }} />
            <Box>
              <TextField
                id="outlined-textarea"
                label="Search description"
                // placeholder="Placeholder"
                rows={2}
                multiline
                fullWidth
                value={descriptionInput}
                onChange={(e) => {
                  setError(null);
                  setDescriptionInput(e.target.value);
                }}
                size="small"
              />
            </Box>
            <Box sx={{ height: "1rem" }} />
            <div style={{ alignSelf: "left" }}>
              <Typography id="users-slider" gutterBottom>
                How many results?
              </Typography>
            </div>
            <Slider
              disabled={isLoading}
              aria-label="Temperature"
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={30}
              marks
              min={10}
              max={1000}
              aria-labelledby="users-slider"
              size="small"
              onChange={(_, v) => {
                setCount(v);
                setDepth((v as number) * 2);
              }}
              value={count}
            />
            <Stack direction="row">
              <TextField
                disabled={isLoading}
                aria-label="Enter depth for the search"
                placeholder="Choose depth"
                label="Depth of search"
                type="number"
                value={depth}
                onChange={handleDepthChange}
              />
              <div
                style={{
                  marginTop: "1rem",
                  marginLeft: "1rem",
                  color: "#4f4c4c",
                }}
              >
                <Typography id="users-slider" fontSize={14} gutterBottom>
                  {`Searching ${count} users using depth of ${depth}`}
                </Typography>
              </div>
            </Stack>

            <Box sx={{ height: "2rem" }} />
            {!isLoading ? (
              <Button
                disabled={isLoading}
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                size="small"
              >
                Search
              </Button>
            ) : null}
            {isLoading ? (
              <Button
                disabled={!isLoading}
                variant="contained"
                fullWidth
                onClick={handleCancel}
                size="small"
              >
                Cancel
              </Button>
            ) : null}
            {isLoading ? (
              <CircularProgressWithLabel
                style={{ margin: "1rem" }}
                value={progress}
              />
            ) : null}
          </Container>
        </Box>
        <Divider flexItem>
          {users && users.length && (
            <Stack direction={"row"}>
              <Typography>
                {" "}
                <IconButton
                  style={{ marginRight: "0.5rem" }}
                  aria-label="Download results"
                  size="medium"
                  onClick={handleDownloadClick}
                >
                  <DownloadRoundedIcon color="success" />
                </IconButton>
                Results
              </Typography>
            </Stack>
          )}
        </Divider>
        <Container maxWidth="sm">
          {users && users.length
            ? users.map((user) => (
                <User key={user.id + Math.random() * 10} user={user} />
              ))
            : null}
        </Container>
      </Container>
    </center>
  );
}

export default Body;

// username list
// description
// amount of users
