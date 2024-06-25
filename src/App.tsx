import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "@/components/Header";
import { blueGrey, teal } from "@mui/material/colors";
import Body from "@/pages/Home/components/Body";
import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import History from "./pages/History/History";
import Verification from "@/pages/Verification/Verification";
import Confirm from "@/pages/Verification/Confirm";
import ProfileContainer from "./pages/Profile/ProfileContainer";
import AuthGuard from "./components/AuthGurd";

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
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<AuthGuard>
						<Header />
						<Routes>
							<Route path="/DAOMatcher/" element={<Body />} />
							<Route path="/DAOMatcher/login/" element={<Login />} />
							<Route path="/DAOMatcher/signup/" element={<Signup />} />
							<Route path="/DAOMatcher/history/" element={<History />} />
							<Route
								path="/DAOMatcher/profile/"
								element={<ProfileContainer />}
							/>
							<Route
								path="/DAOMatcher/verifyEmail/"
								element={<Verification />}
							/>
							<Route
								path="/DAOMatcher/api/auth/confirm/:token"
								element={<Confirm />}
							/>
						</Routes>
					</AuthGuard>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
