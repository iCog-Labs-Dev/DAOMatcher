import React from "react";

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
import { useState } from "react";
import User from "@/pages/Home/User";
import AddIcon from "@mui/icons-material/Add";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import Alert from "@mui/material/Alert";
import CircularProgressWithLabel from "@/pages/Home/CircularProgressWithLabel";
import { Navigate } from "react-router-dom";
import valueText from "@/pages/Home/valueText";
import {
  useHandleCancel,
  useHandleDownload,
  useHandleSubmit,
} from "@/pages/Home/buttonEventHooks";
import useSocket from "@/pages/Home/useSocket";
import { selectAllUsers } from "@/pages/Home/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllHomeStates } from "@/pages/Home/homeSlice";
import { addError, clearError, selectAllErrors } from "@/redux/errorSlice";
import { selectAllInfoMessages } from "@/redux/infoSlice";
import IUser from "@/types/IUser";

function Body({ isLoggedIn }: { isLoggedIn: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [count, setCount] = useState<any>(10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [depth, setDepth] = useState<any>(20);
  useSocket({ count, depth });

  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [handle, setHandle] = useState<string[]>([]);
  const [handleInput, setHandleInput] = useState<string>("");
  // const [estimation, setEstimation] = useState<string>("");

  const users = useSelector(selectAllUsers);
  const success = useSelector(selectAllHomeStates).success;
  const isLoading = useSelector(selectAllHomeStates).isLoading;
  const progress = useSelector(selectAllHomeStates).progress;
  const errors = useSelector(selectAllErrors);
  const infoMessages = useSelector(selectAllInfoMessages);

  const dispatch = useDispatch();

  const { handleDownloadClick } = useHandleDownload();
  const { handleCancel } = useHandleCancel();
  const { handleSubmit } = useHandleSubmit(
    handle,
    descriptionInput,
    count,
    depth
  );

  const addHandler = () => {
    if (handleInput != "") {
      const indexof = handle.indexOf(handleInput);
      if (indexof === -1) {
        setHandle([...handle, handleInput]);
      }
      setHandleInput("");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandleInput = (e: any) => {
    dispatch(clearError());
    if (e.key === "Enter") {
      addHandler();
      return;
    }
    setHandleInput(e.target.value);
  };

  const deleteHandle = (h: string) => {
    setHandle(handle.filter((e) => e != h));
  };

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    setDepth(newValue);
  };

  // useEffect(() => {
  //   const milliseconds = depth * 3474;
  //   const timeString = formatTime(milliseconds);

  //   setEstimation(timeString);
  // }, [depth]);

  // useEffect(() => {
  //   if (users.length === 0 && success) dispatch(setIsLoading(false));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [users, success]);

  if (!isLoggedIn) {
    return <Navigate to="/DAOMatcher/login" />;
  }

  return (
    <center>
      setIsLoading
      <Container maxWidth="lg">
        <Box sx={{ margin: "5rem 0" }}>
          <Container maxWidth="md">
            <Typography variant="h5">
              Search for people with similar interests
            </Typography>
            {errors.map((error: string) => {
              return (
                <Alert
                  severity="error"
                  style={{ marginTop: "5px", marginBottom: "5px" }}
                >
                  {error}
                </Alert>
              );
            })}
            {users.length === 0 && success ? (
              <Alert
                severity="error"
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                No users found with this account
              </Alert>
            ) : null}
            {success && errors.length == 0
              ? infoMessages.map((info: string) => {
                  return (
                    <Alert
                      severity="info"
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    >
                      {info}
                    </Alert>
                  );
                })
              : null}
            {success && users.length > 0 && errors.length == 0 ? (
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
                  dispatch(addError(null));
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
              getAriaValueText={valueText}
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
            ? users.map((user: IUser) => (
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
