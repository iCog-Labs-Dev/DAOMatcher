import React, { useState, useEffect } from "react";
import { selectToken } from "@/redux/userSlice";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, styled, Box } from "@mui/material";
import axios from "axios";
import { selectUser } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import { BASE_URL } from "@/config/default";
import UsersList from "@/pages/Home/components/UsersList";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '90%',
  margin: '20px auto', 
  padding: '20px',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 600,
  },
}));

const StyledButton = styled(Button)({
  marginTop: '20px',
  padding: '8px 16px',
  borderRadius: 15,
});

interface User {
  id: string;
  username: string;
  handle: string;
  image_url: string;
  social_media: string;
  type: "found" | "not_found";
  score: number;
}

interface HistoryItem {
  description: string;
  time_stamp: string;
  user_results: User[];
}

function History() {
  const user = useSelector((state: RootState) => selectUser(state));
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [loading, setLoading] = useState(false);
  const Token = useSelector((state: RootState) => selectToken(state));

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const authToken = Token;
        const response = await axios.get(
          `${BASE_URL}/api/user/${user.id}/search-result?page=${page}&size=${size}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setHistoryData((prevData) => [
          ...prevData,
          ...response.data.data.reverse(),
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history data:", error);
        setLoading(false);
      }
    };
    fetchHistoryData();
  }, [user.id, page, size, Token]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
  };
  

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop="100px"
      >
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          History
        </Typography>
        {historyData.length > 0 ? (
          historyData.map((historyItem, index) => (
            <StyledCard elevation={3} key={index}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {historyItem.description}
                </Typography>
                <Typography variant="body2">
                  {new Date(historyItem.time_stamp).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Users with similar interests:
                </Typography>
                <UsersList users={historyItem.user_results.slice(0, 5)} />
                {historyItem.user_results.length > 5 && (
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setHistoryData((prevData) => {
                        const newData = [...prevData];
                        newData[index].user_results = [
                          ...historyItem.user_results,
                          ...historyItem.user_results.slice(5),
                        ];
                        return newData;
                      })
                    }
                  >
                    Load More
                  </StyledButton>
                )}
              </CardContent>
            </StyledCard>
          ))
        ) : (
          <StyledCard elevation={3}>
            <CardContent>
              <Typography variant="h5" component="div">
                No History
              </Typography>
            </CardContent>
          </StyledCard>
        )}
      </Box>
    </>
  );
}

export default History;
