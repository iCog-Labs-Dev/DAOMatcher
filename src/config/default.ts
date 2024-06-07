import { io } from "socket.io-client";

export const BASE_URL = "https://daomatcher-backend-v2.onrender.com";
// export const BASE_URL = "http://localhost:8000";

export const CONSTANTS = {
	URL: {
		GET_RANDOM_IMAGE: "https://robohash.org",
		PUT_PROFILE: "/api/user", // use it with /userid
	},
	NO_NAVBAR_PAGES: [
		"/DAOMatcher/login",
		"/DAOMatcher/signup",
		"/DAOMatcher/verifyEmail",
	],
};
export const socket = io(BASE_URL, { autoConnect: false });
export const RESUBMIT_COUNT_LIMIT = 5;

export const TWITTER_PREFIX = "tw+";
export const LINKEDIN_PREFIX = "li+";
