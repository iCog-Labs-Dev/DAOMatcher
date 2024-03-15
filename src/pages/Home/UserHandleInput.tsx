import {
  Stack,
  TextField,
  IconButton,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  selectAllHomeStates,
  setHandle,
  setHandleInput,
} from "@/pages/Home/homeSlice";
import { clearInfoMessages } from "@/redux/infoSlice";

const UserHandle = () => {
  const handle = useSelector(selectAllHomeStates).handle;
  const handleInput = useSelector(selectAllHomeStates).handleInput;

  const dispatch = useDispatch();

  const addHandler = () => {
    if (handleInput != "") {
      const indexof = handle.indexOf(handleInput);
      if (indexof === -1) {
        dispatch(setHandle([handleInput, ...handle]));
      }
      dispatch(setHandleInput(""));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputChangeHandler = (e: any) => {
    if (e.key === "Enter") {
      addHandler();
      return;
    }
    dispatch(clearError());
    dispatch(clearInfoMessages());

    dispatch(setHandleInput(e.target.value));
  };

  const deleteHandle = (h: string) => {
    dispatch(setHandle(handle.filter((e) => e != h)));
  };

  return (
    <>
      <Stack direction="row">
        <TextField
          id="outlined-basic"
          label="Mastodon User handles"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
          value={handleInput}
          onKeyDown={inputChangeHandler}
          onBlur={addHandler}
          size="small"
          placeholder="@MarkRuffalo@mastodon.social"
        />
        <IconButton aria-label="delete" size="medium" onClick={addHandler}>
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
          <Typography variant="body2">Handle list will appear here</Typography>
        )}
      </Box>
    </>
  );
};

export default UserHandle;
