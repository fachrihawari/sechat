import { useEffect, useState } from "react";

import socket from "../config/socket";
import { socketEvents } from '@sechat/shared'

const { USER_LIST } = socketEvents

export default function useSocketById() {
  const [socketById, setSocketById] = useState({});

  useEffect(() => {
    socket.on(USER_LIST, (onlineUsers) => {
      // Set online users
      const mapSocket = onlineUsers.reduce((acc, item) => {
        acc[item.user._id] = item.id;
        return acc;
      }, {});
      setSocketById(mapSocket);
    });

    return () => {
      // Remove listener to avoiding memory leak
      socket.removeListener(USER_LIST);
    };
  }, [])

  return socketById
}