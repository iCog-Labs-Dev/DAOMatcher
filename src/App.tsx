import { createBrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material";
import Header from "./Components/Header/Header";
import { blueGrey, teal } from "@mui/material/colors";
import Body from "./Components/Body/Body";
import Login from "./Components/Login/Login";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Body />
      </>
    ),
  },
  { path: "/login", element: <Login /> },
]);

function App() {
  return <></>;
}

export default App;
