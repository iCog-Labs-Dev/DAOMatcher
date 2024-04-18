import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Header from "@/components/Header";
import { blueGrey, teal } from "@mui/material/colors";
import Body from "@/pages/Home/components/Body";
import Login from "@/pages/Login/Login";

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
  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/DAOMatcher/" element={<Body />} />
            <Route path="/DAOMatcher/login/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
