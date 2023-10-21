/* eslint-disable @typescript-eslint/no-explicit-any */
// Install Material-UI if not already installed
// npm install @mui/material @emotion/react @emotion/styled

import { useState, CSSProperties, useEffect } from "react";
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
import { Navigate, useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

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
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // const navigate = useNavigate();

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

    console.log(`Email: ${email} Password: ${password}`);

    let data: LoginResponse;
    try {
      const { data: successData }: AxiosResponse<LoginResponse> =
        await axios.post(
          "http://localhost:8000/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
      data = successData;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData: LoginResponse = error
          ? error.response
            ? error.response.data
              ? error.response.data
              : null
            : null
          : null;

        data = errorData
          ? errorData
          : { success: false, message: "Login Failed due to server error" };
      } else {
        data = {
          success: false,
          message: "Something went wrong with your login",
        };
      }
    }

    const { success, message } = data;
    setSuccess(success);
    if (!success) {
      return setError(message);
    } else {
      Cookies.set("email", "email", { expires: 1 / 24 });
      setEmail("");
      setPassword("");
      setSuccessMessage(message);
      setError("");
      window.location.reload();
    }
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
          {success && successMessage ? (
            <Alert severity="success">{successMessage}</Alert>
          ) : null}
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
