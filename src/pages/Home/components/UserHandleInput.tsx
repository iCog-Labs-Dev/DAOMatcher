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
  clearHandleInputs,
  setMastodonHandleInput,
  setTwitterHandleInput,
  setLinkedInHandleInput,
} from "@/pages/Home/homeSlice";
import { clearInfoMessages } from "@/redux/infoSlice";
import { LINKEDIN_PREFIX, TWITTER_PREFIX } from "@/config/default";
import { useState } from "react";

const UserHandleInputInput = () => {
  const handle = useSelector(selectAllHomeStates).handle;
  const [displayHandle, setDisplayHandle] = useState<string[]>([]);
  const mastodonHandleInput =
    useSelector(selectAllHomeStates).mastodonHandleInput;
  const linkedInHandleInput =
    useSelector(selectAllHomeStates).linkedInHandleInput;
  const twitterHandleInput =
    useSelector(selectAllHomeStates).twitterHandleInput;

  const dispatch = useDispatch();

  const addHandler = () => {
    if (mastodonHandleInput || linkedInHandleInput || twitterHandleInput) {
      const handlesToAdd = [];
      const annotatedHandles = [];
      if (mastodonHandleInput && !displayHandle.includes(mastodonHandleInput)) {
        handlesToAdd.push(mastodonHandleInput);
        annotatedHandles.push(mastodonHandleInput);
      }
      if (linkedInHandleInput && !displayHandle.includes(linkedInHandleInput)) {
        handlesToAdd.push(linkedInHandleInput);
        annotatedHandles.push(`${LINKEDIN_PREFIX}${linkedInHandleInput}`);
      }
      if (twitterHandleInput && !displayHandle.includes(twitterHandleInput)) {
        handlesToAdd.push(twitterHandleInput);
        annotatedHandles.push(`${TWITTER_PREFIX}${twitterHandleInput}`);
      }

      dispatch(setHandle([...annotatedHandles, ...handle]));
      setDisplayHandle([...handlesToAdd, ...displayHandle]);
      dispatch(clearHandleInputs());
    }
  };

  const inputChangeHandler = (e: any) => {
    if (e.key === "Enter") {
      addHandler();
      return;
    }
    dispatch(clearError());
    dispatch(clearInfoMessages());

    const { name, value } = e.target;
    if (name === "mastodonHandleInput") dispatch(setMastodonHandleInput(value));
    else if (name === "linkedInHandleInput")
      dispatch(setLinkedInHandleInput(value));
    else if (name === "twitterHandleInput")
      dispatch(setTwitterHandleInput(value));

    dispatch(clearError());
    dispatch(clearInfoMessages());
  };

  const deleteHandle = (h: string) => {
    dispatch(
      //The following checks if the string is a mastodon handle, if so no need to slice, if not, compare by removing the prefix of the handle
      setHandle(
        handle.filter((e) => (e.charAt(0) === "@" ? e != h : e.slice(3) != h))
      )
    );
    setDisplayHandle(displayHandle.filter((e) => e != h));
  };

  return (
    <>
      <Stack direction="row">
        <TextField
          id="outlined-basic"
          name="mastodonHandleInput"
          label="Mastodon User handles"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
          value={mastodonHandleInput}
          onKeyDown={inputChangeHandler}
          onBlur={addHandler}
          size="small"
          placeholder="@MarkRuffalo@mastodon.social"
        />

        <Box sx={{ width: "1rem" }} />

        <TextField
          id="outlined-basic"
          name="linkedInHandleInput"
          label="LinkedIn User handles"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
          value={linkedInHandleInput}
          onKeyDown={inputChangeHandler}
          onBlur={addHandler}
          size="small"
          placeholder="benjamin-grant-72381ujy3u"
        />

        <Box sx={{ width: "1rem" }} />

        <TextField
          id="outlined-basic"
          name="twitterHandleInput"
          label="Twitter User handles"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
          value={twitterHandleInput}
          onKeyDown={inputChangeHandler}
          onBlur={addHandler}
          size="small"
          placeholder="sololeveling_en"
        />
        <IconButton aria-label="delete" size="medium" onClick={addHandler} id="tour-add-user-handle-input">
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <Box sx={{ margin: "1rem 0" }}>
        {displayHandle.length ? (
          displayHandle.map((h, i) => (
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

export default UserHandleInputInput;
