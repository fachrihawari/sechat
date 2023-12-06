import { useCallback, useEffect, useState } from "react";
import { socketEvents } from '@sechat/shared'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import http from '../config/http'

import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import ChatUsers from "../components/ChatUsers";
import socket from "../config/socket";
import useSocketById from "../hooks/useSocketById";
import useMessageById from "../hooks/useMessageById";
import useSocketConnect from "../hooks/useSocketConnect";

function ChatPage() {
  const navigate = useNavigate()

  // Connect to socket with auth
  useSocketConnect()

  // Map of socket by user id
  const socketById = useSocketById()

  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadById, setUnreadById] = useState({});
  const { messagesById, setMessagesById } = useMessageById()
  const { data: users, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await http.get('/users')
      return data
    },
  })

  const onUserClick = useCallback((user) => {
    console.log(user)
    setSelectedUser({ ...user, socketId: socketById[user._id] });
    setUnreadById({
      [user.id]: false,
    });
  }, [socketById]);

  const onLogoutClick = useCallback(() => {
    localStorage.clear()
    socket.disconnect()
    navigate('/login')
  }, []);

  const handleMessageSent = useCallback((message) => {
    setMessagesById((current) => {
      const newMessage = {
        ...message
      };
      // Clone current state
      const cloned = structuredClone(current);

      // Get messages by user id
      let messages = cloned[newMessage.receiverUserId];
      if (Array.isArray(messages)) {
        messages.push(newMessage);
      } else {
        messages = [newMessage];
      }

      // Set new messages array to cloned
      cloned[newMessage.receiverUserId] = messages;

      return cloned;
    });
  }, []);

  return (
    <div className="flex-1 flex flex-row h-screen">
      {
        isPending ? <h1>Loading</h1> :
          <ChatUsers
            me={socket}
            users={users}
            socketById={socketById}
            unreadById={unreadById}
            selectedUser={selectedUser}
            onUserClick={onUserClick}
            onLogoutClick={onLogoutClick}
          />
      }
      {selectedUser ? (
        <div className="flex flex-1 flex-col">
          <ChatHeader selectedUser={selectedUser} />
          <ChatBox messages={messagesById[selectedUser?._id] ?? []} selectedUser={selectedUser} />
          <ChatInput selectedUser={selectedUser} onSent={handleMessageSent} />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-4xl">Choose a user to start chat!</span>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
