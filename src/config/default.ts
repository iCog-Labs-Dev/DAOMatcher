import { io } from "socket.io-client";

// export const BASE_URL = "https://daomatcher-backend-v2.onrender.com";
export const BASE_URL = "http://localhost:8000";
export const socket = io(BASE_URL, { autoConnect: false });
export const RESUBMIT_COUNT_LIMIT = 5;

export const TWITTER_PREFIX = "tw+";
export const LINKEDIN_PREFIX = "li+";
