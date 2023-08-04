import {  ThemeProvider, createTheme } from "@mui/material"
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";
import { blueGrey, cyan, teal,grey } from "@mui/material/colors";
const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: teal,
        secondary: blueGrey,
      },
});
function App() {

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Body/>
        </ThemeProvider>
    )
}

export default App
