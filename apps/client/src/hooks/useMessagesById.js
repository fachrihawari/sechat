import { useEffect, useState } from "react";

import socket from "../config/socket";
import { socketEvents } from '@sechat/shared'

const { CHAT_NEW_MESSAGE } = socketEvents

export default function useMessages({ selectedUser }) {
  const [messagesById, setMessagesById] = useState({});
  const [unreadById, setUnreadById] = useState({});

  useEffect(() => {
    socket.on(CHAT_NEW_MESSAGE, (message) => {
      // Add new message to the user
      setMessagesById((current) => {
        const newMessage = { ...message }

        // Clone current state
        const cloned = structuredClone(current);

        // Get messages by user id
        let messages = cloned[message.sender._id];
        if (Array.isArray(messages)) {
          messages.push(newMessage);
        } else {
          messages = [newMessage];
        }

        // Set new messages array to cloned
        cloned[message.sender._id] = messages;

        return cloned;
      });

      // Set unread to the user and only set if not selected user
      if (selectedUser?._id !== message.sender._id) {
        setUnreadById((current) => ({
          ...current,
          [message.sender._id]: true,
        }));
      }
    });

    return () => {
      // Remove listener to avoiding memory leak
      socket.off(CHAT_NEW_MESSAGE);
    };
  }, [selectedUser]);

  return { messagesById, setMessagesById, unreadById, setUnreadById }
}
