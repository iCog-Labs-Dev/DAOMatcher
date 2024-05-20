import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Header from "@/components/Header";
import { blueGrey, teal } from "@mui/material/colors";
import Body from "@/pages/Home/components/Body";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import Verification from "@/pages/Verification/Verification";
import Confirm from "./pages/Verification/Confirm";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: teal,
    secondary: blueGrey,
  },
});

function App() {
  const {token} = useParams();
  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/DAOMatcher/" element={<Body />} />
            <Route path="/DAOMatcher/login/" element={<Login />} />
            <Route path="/DAOMatcher/signup/" element={<Signup />} />
            <Route path="/DAOMatcher/verifyEmail/" element={<Verification />} />
            <Route path={`/api/auth/confirm/${token || ""}`} element={<Confirm token={token || ""} />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
