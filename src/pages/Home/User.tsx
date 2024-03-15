import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IUser from "@/types/IUser";

interface Props {
  user: IUser;
}

function getUrl(handle: string) {
  if (handle.includes("@")) {
    const baseUrl = `https://mastodon.social`;
    try {
      const username = handle.split("@mastodon.social")[0];
      return `${baseUrl}/${username}`;
    } catch (error) {
      return `${baseUrl}/${handle}`;
    }
  } else {
    return `https://www.linkedin.com/in/${handle}/`;
  }
}

function User({ user }: Props) {
  return (
    <Fragment>
      <Box sx={{ margin: "0.5rem 1rem", padding: "1rem 0" }}>
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack direction="row">
            <Avatar
              alt="Remy Sharp"
              src={user.image || `https://robohash.org/${Math.random()}`}
            />
            <Box sx={{ textAlign: "left", marginLeft: "1rem" }}>
              <Typography>{user.name}</Typography>
              <Typography color="gray">@{user.username}</Typography>
              <Typography color="gray" fontSize={"14px"}>
                {user.score}% Match
              </Typography>
            </Box>
          </Stack>
          <Button
            startIcon={<OpenInNewIcon />}
            href={getUrl(user.handle)}
            target="blank"
          >
            Visit profile
          </Button>
        </Stack>
      </Box>
      <Divider />
    </Fragment>
  );
}

export default User;
