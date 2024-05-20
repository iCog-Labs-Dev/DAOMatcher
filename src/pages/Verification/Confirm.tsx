import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

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

function Confirm({ token }:{ token: string }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [confirmationStatus, setConfirmationStatus] = useState('pending');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`/api/auth/confirm/${token}`);
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

  let confirmationMessage;
  switch (confirmationStatus) {
    case 'pending':
      confirmationMessage = (
        <>
          <CircularProgress />
          <Typography variant="body1" className={classes.message}>
            Verifying...
          </Typography>
        </>
      );
      break;
    case 'error':
      confirmationMessage = (
        <Typography variant="body1" className={classes.message}>
          Error confirming email. Please try again later.
        </Typography>
      );
      break;
    default:
      confirmationMessage = null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">Email Confirmation</Typography>
      {confirmationMessage}
    </div>
  );
}

export default Confirm;
