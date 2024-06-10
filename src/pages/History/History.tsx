import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, styled, Box, Avatar, CircularProgress } from "@mui/material";
import { clearUser, selectToken, selectUser } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import axiosInstance from "@/services/api/axiosInstance";
import JoyrideTour from "@/components/ui/JoyrideTour";
import { historyPageSteps } from "@/components/TourSteps/Steps";
import { selectAllHomeStates } from "../Home/homeSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '95%', // Increase card width
  margin: '20px auto',
  padding: '20px',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 700,
  },
}));

const StyledButton = styled(Button)({
  marginTop: '20px',
  padding: '8px 16px',
  borderRadius: 5,
});

const UserCard = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ddd',
  width: '100%',
});

const UserAvatar = styled(Avatar)({
  marginRight: '10px',
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
  const [loading, setLoading] = useState(false);
  const Token = useSelector((state: RootState) => selectToken(state));
  const [visibleCounts, setVisibleCounts] = useState<number[]>([]);
  const isLoggedIn = useSelector(selectAllHomeStates).isLoggedIn;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/user/${user.id}/search-result`);
        const newHistoryData = response.data.data; // Reverse the order
        setHistoryData(newHistoryData);
        setVisibleCounts(new Array(newHistoryData.length).fill(5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history data:", error);
        setLoading(false);
      }
    };
    fetchHistoryData();
  }, [user.id, Token]);

  const handleLoadMoreUsers = (index: number) => {
    setVisibleCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] += 5;
      return newCounts;
    });
  };

  if (!isLoggedIn) {
    dispatch(clearUser());
    return <Navigate to="/DAOMatcher/login" />;
  }

  return (
    <>
    <JoyrideTour steps={historyPageSteps} tourKey="historyTourCompleted" />
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop="100px"
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }} id="historyPageTitle">
        History
      </Typography>
      {loading && <CircularProgress />}
      {historyData.length > 0 ? (
        historyData.map((historyItem, index) => (
          <StyledCard elevation={3} key={index} id="historyResult">
            <CardContent>
              <Typography variant="h4" component="div" style={{ textTransform: 'capitalize' }}>
                {historyItem.description}
              </Typography>
              <Typography variant="body2">
                {new Date(historyItem.time_stamp).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Users with similar interests:
              </Typography>
              {historyItem.user_results.slice(0, visibleCounts[index]).map((user, userIndex) => (
                <UserCard key={userIndex}>
                  <UserAvatar src={user.image_url} alt={user.username} />
                  <Typography variant="body2">
                    {user.username} ({user.handle})
                  </Typography> 
                  <Typography variant="body2">
                    {user.score}%
                  </Typography> 
                </UserCard>
              ))}
              {visibleCounts[index] < historyItem.user_results.length && (
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleLoadMoreUsers(index)}
                  id="loadMoreButton"
                >
                  Load More
                </StyledButton>
              )}
            </CardContent>
          </StyledCard>
        ))
      ) : (
        !loading && (
          <StyledCard elevation={3}>
            <CardContent>
              <Typography variant="h5" component="div">
                No History
              </Typography>
            </CardContent>
          </StyledCard>
        )
      )}
    </Box>
    </>
  );
}

export default History;
