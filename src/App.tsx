import { ThemeProvider, createTheme } from "@mui/material";
import Header from "./Components/Header/Header";
import { blueGrey, teal } from "@mui/material/colors";
import Body from "./Components/Body/Body";
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
    <ThemeProvider theme={theme}>
      <Header />
      <Body />
    </ThemeProvider>
  );
}

export default App;
