
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_APP_SOCKET_IO_URL);

export default socket