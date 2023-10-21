import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material";
import Header from "./Components/Header/Header";
import { blueGrey, teal } from "@mui/material/colors";
import Body from "./Components/Body/Body";
import Login from "./Components/Login/Login";
import { checkSession } from "./utils/cookies";
export const theme = createTheme({
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

const isLoggedIn = checkSession("email");

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/DAOMatcher"
            element={<Body isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/DAOMatcher/login"
            element={<Login isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
