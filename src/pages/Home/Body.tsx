import React, { useEffect } from "react";

import {
  Box,
  Button,
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
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
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
import { selectAllHomeStates, setIsLoading } from "@/pages/Home/homeSlice";
import { clearError } from "@/pages/Home/homeSlice";
import { clearInfoMessages } from "@/redux/infoSlice";
import IUser from "@/types/IUser";
import ErrorList from "@/pages/Home/ErrorList";
import UserHandle from "@/pages/Home/UserHandleInput";

function Body({ isLoggedIn }: { isLoggedIn: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [count, setCount] = useState<any>(10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [depth, setDepth] = useState<any>(20);
  useSocket({ count, depth });

  const [descriptionInput, setDescriptionInput] = useState<string>("");
  // const [estimation, setEstimation] = useState<string>("");

  const users = useSelector(selectAllUsers);
  const success = useSelector(selectAllHomeStates).success;
  const isLoading = useSelector(selectAllHomeStates).isLoading;
  const progress = useSelector(selectAllHomeStates).progress;
  const inputError = useSelector(selectAllHomeStates).error;

  const dispatch = useDispatch();

  const { handleDownloadClick } = useHandleDownload();
  const { handleCancel } = useHandleCancel();
  const { handleSubmit } = useHandleSubmit(descriptionInput, count, depth);

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    setDepth(newValue);
  };

  // useEffect(() => {
  //   const milliseconds = depth * 3474;
  //   const timeString = formatTime(milliseconds);

  //   setEstimation(timeString);
  // }, [depth]);

  useEffect(() => {
    if (users.length === 0 && success) dispatch(setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <ErrorList inputError={inputError} success={success} />

            <Box sx={{ height: "2rem" }} />
            <UserHandle />

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
                  dispatch(clearError());
                  dispatch(clearInfoMessages());
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
          {users && users.length > 0
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
