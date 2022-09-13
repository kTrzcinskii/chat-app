import { io } from "socket.io-client";
import { createContext } from "react";
import { BACKEND_URL } from "./constants";

export const socket = io(BACKEND_URL, { withCredentials: true });

export const SocketContext = createContext(socket);
