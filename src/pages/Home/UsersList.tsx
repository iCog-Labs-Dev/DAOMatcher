import User from "@/pages/Home/User";
import IUser from "@/types/IUser";
import { Divider, Stack, Typography, Container } from "@mui/material";
import DownloadButton from "@/pages/Home/DownloadButton";
import { useHandleDownload } from "./buttonEventHooks";

interface IProps {
  users: IUser[];
}

const UsersList = ({ users }: IProps) => {
  const { handleDownloadClick } = useHandleDownload();
  return (
    <>
      <Divider flexItem>
        {users && users.length && (
          <Stack direction={"row"}>
            <Typography>
              <DownloadButton handleDownloadClick={handleDownloadClick} />
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
    </>
  );
};

export default UsersList;
