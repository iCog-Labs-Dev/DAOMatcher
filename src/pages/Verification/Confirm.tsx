import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '@/config/default';
import { selectToken } from "@/redux/userSlice";
import { useSelector } from "react-redux";
import AuthResponse from '@/types/AuthTypes'


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  message: {
    marginTop: "2px",
  },
}));

type ConfirmationStatus = 'pending' | 'success' | 'error';

function Confirm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [confirmationStatus, setConfirmationStatus] = useState<ConfirmationStatus>('pending');
  const authtoken = useSelector(selectToken);
  //useParam
  const token = window.location.pathname.split('/').pop();
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response: AxiosResponse<AuthResponse> = await axios.get(`${BASE_URL}/api/auth/confirm/${token}`, 
        { withCredentials: true, headers: { Authorization: `Bearer ${authtoken}` }}
        );
        
        if (response.status === 200) {
          setConfirmationStatus('success');
        } else {
          setConfirmationStatus('error');
        }
      } catch (error) {
        setConfirmationStatus('error');
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (confirmationStatus === 'success') {
      navigate('/DAOMatcher');
    }
  }, [confirmationStatus, navigate]);

  let ConfirmationMessageComponent;
  switch (confirmationStatus) {
    case 'pending':
      ConfirmationMessageComponent = (
        <>
          <CircularProgress />
          <Typography variant="body1" className={classes.message}>
            Verifying...
          </Typography>
        </>
      );
      break;
    case 'error':
      ConfirmationMessageComponent = (
        <Typography variant="body1" className={classes.message}>
          Error confirming email. Please try again later.
        </Typography>
      );
      break;
    default:
      ConfirmationMessageComponent = null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">Email Confirmation</Typography>
      {ConfirmationMessageComponent}
    </div>
  );
}

export default Confirm;
