import { useState, useEffect } from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { MailOutline } from '@mui/icons-material';
import { selectToken, selectUser } from "@/redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from '@/redux/store';
import { BASE_URL } from '@/config/default';
import axios, { AxiosError, AxiosResponse } from "axios";

interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export default function Verification() {
  const token = useSelector((state: RootState) => selectToken(state));
  const user = useSelector((state: RootState) => selectUser(state));
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [resendDisabled, setResendDisabled] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/DAOMatcher/login');
    }
    return () => {
      clearInterval(countdown);
    };
  }, [token, navigate]);

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown(prevCountdown => Math.max(0, prevCountdown - 1));
      }, 1000);
    }
    return () => clearInterval(countdownTimer);
  }, [resendDisabled, countdown]);

  const handleResendClick = async () => {
    if (!resendDisabled) {
      setResendDisabled(true);
      setCountdown(10);

      try {
        const { data: successData }: AxiosResponse<AuthResponse> = await axios.get(
          `${BASE_URL}/api/auth/confirm/resend`,
          { withCredentials: true, headers: { Authorization: `Bearer ${token}` }
           }
        );

        if (successData.success) {
          console.log(successData.message || 'Verification email resent successfully');
        } else {
          console.error('Failed to resend verification email:', successData.message);
        }
      } catch (error) {
        let errorData: AuthResponse | null = null;

        if (error instanceof AxiosError) {
          if (error.response && error.response.data) {
            errorData = error.response.data;
          }
        }

        const data = errorData ?? {
          success: false,
          data: null,
          error: "Failed to resend verification email due to server error",
          message: null,
        };

        console.error('Error resending verification email:', data.error);
      }

      setTimeout(() => {
        setResendDisabled(false);
      }, 10000);
    }
  };


  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth="sm" style={{  display: "flex", flexDirection:"column"}}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <MailOutline style={{ fontSize: 50 }} />
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Verify Your Email Address
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          We've sent an email to <strong>{user.email}</strong> to verify your email address.
        </Typography>
        <br/>
        <Typography variant="body2" gutterBottom align="center">
          If you didn't receive the verification email, click the button below 
          {countdown > 0 && ` after ${countdown} seconds`}
        </Typography>
        <Button variant="contained" onClick={handleResendClick} disabled={resendDisabled}>
          Resend The Verification Email
        </Button>
      </Container>
    </div>
  );
}
