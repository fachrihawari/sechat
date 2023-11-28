import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_APP_SERVER_URL, { autoConnect: false });

export default socket