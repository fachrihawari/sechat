import { useEffect } from 'react';

import socket from '../config/socket';

export default function useSocketAuth() {
  useEffect(() => {
    // Reconnect if user reload the browser
    if (localStorage.getItem("accessToken")) {
      socket.auth = {
        accessToken: localStorage.getItem("accessToken"),
        user: {
          username: localStorage.getItem("username"),
          email: localStorage.getItem("email"),
          _id: localStorage.getItem("_id"),
        }
      };
      socket.connect();
    }
  }, []);
}