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
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { validateEmail, validatePassword } from "../../utils/validators";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

interface LoginResponse {
  success: boolean;
  message: string;
}

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

const LoginPage = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/DAOMatcher/" replace />;
  }

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!validateEmail(email, setEmailError)) {
      console.log("Email is invalid : ", email);
      return;
    }

    if (!validatePassword(password, setPassError)) {
      console.log("Password is invalid: ", email);
      return;
    }
    const { data }: AxiosResponse<LoginResponse> = await axios.post(
      "http://localhost:8000/login",
      {
        email,
        password,
      }
    );

    const { success, message } = data;

    if (!success) return setError(message);
    return setError("");
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
          {error ? <Alert severity="error">{error}</Alert> : null}
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
            onBlur={() => validateEmail(email, setEmailError)}
          />
          <FormHelperText error>{emailError}</FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validatePassword(password, setPassError)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={tooglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormHelperText error>{passError}</FormHelperText>
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
