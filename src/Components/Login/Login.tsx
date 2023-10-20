/* eslint-disable @typescript-eslint/no-explicit-any */
// Install Material-UI if not already installed
// npm install @mui/material @emotion/react @emotion/styled

import { useState, CSSProperties } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  FormHelperText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const styles = {
  paper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
  avatar: {
    margin: "8px",
    backgroundColor: "secondary",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "8px",
  },
  submit: {
    margin: "24px 0 16px",
  },
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = () => {
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (validateEmail()) {
      console.log("Email is valid : ", email);
    }
    // Add your login logic here
    console.log("Logging in with:", email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={styles.paper}>
        <Avatar style={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form style={styles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          <FormHelperText error>{emailError}</FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            style={styles.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
