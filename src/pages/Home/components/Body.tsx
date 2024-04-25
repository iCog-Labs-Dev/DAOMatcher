import React, { useEffect } from "react";

import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CircularProgressWithLabel from "@/pages/Home/components/CircularProgressWithLabel";
import { Navigate } from "react-router-dom";
import {
  useHandleCancel,
  useHandleSubmit,
} from "@/pages/Home/buttonEventHooks";
import useSocket from "@/pages/Home/useSocket";
import { selectAllUsers } from "@/pages/Home/usersSlice";
import { useDispatch, useSelector, Provider } from "react-redux";
import { selectAllHomeStates, setIsLoading } from "@/pages/Home/homeSlice";
import { clearError } from "@/pages/Home/homeSlice";
import { clearInfoMessages } from "@/redux/infoSlice";
import ErrorList from "@/pages/Home/components/ErrorList";
import UserHandleInput from "@/pages/Home/components/UserHandleInput";
import SearchButton from "@/pages/Home/components/SearchButton";
import CancelButton from "@/pages/Home/components/CancelButton";
import UsersList from "@/pages/Home/components/UsersList";
import CountInput from "@/pages/Home/components/CountInput";
import DepthInput from "@/pages/Home/components/DepthInput";
import { selectIsLoggedIn } from "@/redux/userSlice";
import SocketContext from "../../../redux/SocketContext";

function Body() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [count, setCount] = useState<number>(10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [depth, setDepth] = useState<number>(20);
  const socket = useSocket({ count, depth });

  const [descriptionInput, setDescriptionInput] = useState<string>("");
  // const [estimation, setEstimation] = useState<string>("");

  const users = useSelector(selectAllUsers);
  const success = useSelector(selectAllHomeStates).success;
  const isLoading = useSelector(selectAllHomeStates).isLoading;
  const progress = useSelector(selectAllHomeStates).progress;
  const inputError = useSelector(selectAllHomeStates).error;
  const connect = useSelector(selectAllHomeStates).connect;
  const disconnect = useSelector(selectAllHomeStates).disconnect;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { handleCancel } = useHandleCancel();
  const { handleSubmit } = useHandleSubmit(descriptionInput, count, depth);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearError());
    dispatch(clearInfoMessages());
    setDescriptionInput(e.target.value);
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

  useEffect(() => {
    if (users.length === 0 && success) dispatch(setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, success]);

  useEffect(() => {
    if (!socket.current.connected && connect) socket.current.connect();
    if (socket.current.connected && disconnect) socket.current.disconnect();
  }, [isLoading]);

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

            <UserHandleInput />

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
                onChange={handleDescriptionChange}
                size="small"
              />
            </Box>

            <Box sx={{ height: "1rem" }} />

            <CountInput
              isLoading={isLoading}
              count={count}
              handleChange={(_: Event, v: number | number[]) => {
                setCount(v as number);
                setDepth((v as number) * 2);
              }}
            />

            <DepthInput
              isLoading={isLoading}
              depth={depth}
              count={count}
              handleDepthChange={handleDepthChange}
            />
            <SocketContext.Provider value={socket.current}>
              <Box sx={{ height: "2rem" }} />
              <SearchButton isLoading={isLoading} handleSubmit={handleSubmit} />
              <CancelButton isLoading={isLoading} handleCancel={handleCancel} />
              <CircularProgressWithLabel
                style={{ margin: "1rem" }}
                value={progress}
                isLoading={isLoading}
              />
            </SocketContext.Provider>
          </Container>
        </Box>

        <UsersList users={users} />
      </Container>
    </center>
  );
}

export default Body;
