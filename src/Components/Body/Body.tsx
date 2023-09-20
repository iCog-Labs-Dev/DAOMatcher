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
import { useEffect, useState } from "react";
import User from "./User/User";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import CircularProgressWithLabel from "./CircularProgressWithLabel/CircularProgressWithLabel";

export interface IUser {
  id: string;
  username: string;
  name: string;
  score: number;
  handle: string;
}

export interface Response {
  result: IUser[];
}

function valuetext(value: number) {
  return `${value}°C`;
}

function Body() {
  const [handle, setHandle] = useState<string[]>([]);
  const [handleInput, setHandleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [count, setCount] = useState<any>(100);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [depth, setDepth] = useState<number>(2);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const BASE_URL = "http://localhost:8000";
  const addHandler = () => {
    if (handleInput != "") {
      setHandle([...handle, handleInput]);
      setHandleInput("");
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandleInput = (e: any) => {
    if (e.key === "Enter") {
      addHandler();
      return;
    }
    setHandleInput(e.target.value);
  };
  const deleteHandle = (h: string) => {
    setHandle(handle.filter((e) => e != h));
  };
  const handleSubmit = async () => {
    const requestBody = {
      handle,
      descriptionInput,
      count,
    };
    console.log(requestBody);

    if (handle.length > 0 && descriptionInput != "") {
      setIsLoading(true);
      setUsers([]);
      try {
        const response = await fetch(BASE_URL, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: descriptionInput,
            user_list: handle,
            user_limit: 3,
          }),
        });
        const data = (await response.json()) as Response;
        console.log(data); //For debugging only
        const { result: users } = data;
        users.sort((a, b) => b.score - a.score);
        setUsers(users);
        setError(null);
        setSuccess(true);
      } catch (error) {
        console.log("Error: ", error);
        setError(error);
        setSuccess(false);
      } finally {
        setProgress(0);
        setIsLoading(false);
      }
    } else {
      setError("Empty handles or description!");
      setSuccess(false);
    }
  };

  useEffect(() => {
    const eventSource = new EventSource(BASE_URL + "/stream");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("recieved data: ", data);

        const { progress: tempProgress, curr_user: user } = data;

        if (!tempProgress) {
          console.log(data.error);
        } else {
          console.log("tempProgress: ", tempProgress);
          console.log("count: ", count);
          console.log("user: ", user);

          const percentage = (tempProgress / count) * 100;
          setProgress(percentage);
        }
      } catch (error) {
        console.log(error);
      }
    };

    eventSource.onerror = (error) => {
      console.log("Error: ", error);
      setError(error);
      setSuccess(false);
    };

    return () => {
      eventSource.close();
    };
  });

  return (
    <center>
      <Container maxWidth="lg">
        <Box sx={{ margin: "5rem 0" }}>
          <Container maxWidth="md">
            <Typography variant="h5">
              Search for people with similar interests
            </Typography>
            {error ? <Alert severity="error">{error}</Alert> : null}
            {success ? (
              <Alert severity="success">Loading successful</Alert>
            ) : null}

            <Box sx={{ height: "2rem" }} />
            <Stack direction="row">
              <TextField
                id="outlined-basic"
                label="User handles"
                variant="outlined"
                fullWidth
                onChange={changeHandleInput}
                value={handleInput}
                onKeyDown={changeHandleInput}
                size="small"
                placeholder="LinkedIn or Mastodon handle"
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
                onChange={(e) => setDescriptionInput(e.target.value)}
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
              aria-label="Temperature"
              defaultValue={100}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={100}
              marks
              min={100}
              max={1000}
              aria-labelledby="users-slider"
              size="small"
              onChange={(_, v) => setCount(v)}
              value={count}
            />
            <Stack direction="row">
              <TextField
                id="outlined-textarea"
                label="Depth of the search"
                rows={1}
                value={depth}
                onChange={(_, v: number) => {
                  console.log(depth);
                  setDepth(v);
                }}
                size="small"
                type="number"
              />
              <TextField
                style={{ marginLeft: 10 }}
                id="outlined-textarea"
                label="Cost estimation"
                value={null}
                size="small"
                contentEditable="false"
                disabled
              />
            </Stack>

            <Box sx={{ height: "2rem" }} />

            <Button
              disabled={isLoading}
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              size="small"
            >
              Search
            </Button>
            {isLoading ? (
              <CircularProgressWithLabel
                style={{ margin: "1rem" }}
                value={progress}
              />
            ) : null}
          </Container>
        </Box>
        <Divider flexItem>
          {users && users.length && <Typography>Results</Typography>}
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