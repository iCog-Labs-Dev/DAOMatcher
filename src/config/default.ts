import { io, Socket } from "socket.io-client";

// export const BASE_URL = "https://daomatcher-backend-v2.onrender.com";
export const BASE_URL = "http://localhost:8000";

export const getSocket = (token: string): Socket => {
  return io(`${BASE_URL}`, {
    query: {
      token,
    },
  });
};
