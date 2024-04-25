import { socket } from "@/config/default";
import { createContext } from "react";

export const SocketContext = createContext(socket);
export default SocketContext;
