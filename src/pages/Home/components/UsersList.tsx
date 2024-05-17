import User from "@/pages/Home/components/User";
import IUser from "@/types/IUser";
import {
  Divider,
  Stack,
  Typography,
  Container,
  Pagination,
  Box,
} from "@mui/material";
import DownloadButton from "@/pages/Home/components/DownloadButton";
import { useHandleDownload } from "../buttonEventHooks";
import { useState } from "react";

interface IProps {
  users: IUser[];
}

const UsersList = ({ users }: IProps) => {
  const { handleDownloadClick } = useHandleDownload();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

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
        {currentUsers.map((user: IUser) => (
          <User key={user.id} user={user} />
        ))}
      </Container>

      {currentUsers.length > 0 && (
        <>
          <Box sx={{ height: "1rem" }} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(users.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>
          <Box sx={{ height: "2rem" }} />
        </>
      )}
    </>
  );
};

export default UsersList;
