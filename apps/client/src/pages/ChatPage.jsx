import { useCallback, useEffect, useState } from "react";
import { socketEvents } from '@sechat/shared'
import { useNavigate } from 'react-router-dom'

import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import OnlineUsers from "../components/OnlineUsers";
import socket from "../config/socket";

const { USER_LIST, USER_DISCONNECTED, CHAT_NEW_MESSAGE } = socketEvents

function ChatPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadById, setUnreadById] = useState({});
  const [messagesById, setMessagesById] = useState({});

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

    // Listen whenever new user connected or disconnected
    socket.on(USER_LIST, (onlineUsers) => {
      const usersExceptMe = onlineUsers.filter(
        (onlineUser) => onlineUser.user._id !== socket.auth.user._id
      );
      setUsers(usersExceptMe);
    });

    return () => {
      // Remove listener to avoiding memory leak
      socket.removeListener(USER_LIST);
    };
  }, []);

  useEffect(() => {
    socket.on(CHAT_NEW_MESSAGE, ({ content, from }) => {
      // Add new message to the user
      setMessagesById((current) => {
        const newMessage = {
          content,
          fromId: from,
          fromSelf: false,
        };
        // Clone current state
        const cloned = structuredClone(current);

        // Get messages by user id
        let messages = cloned[from];
        if (Array.isArray(messages)) {
          messages.push(newMessage);
        } else {
          messages = [newMessage];
        }

        // Set new messages array to cloned
        cloned[from] = messages;

        return cloned;
      });

      // Set unread to the user and only set if not selected user
      if (selectedUser?.id !== from) {
        setUnreadById((current) => ({
          ...current,
          [from]: true,
        }));
      }
    });

    socket.on(USER_DISCONNECTED, (id) => {
      if (selectedUser?.id === id) {
        setSelectedUser(null);
        alert("User disconnected " + selectedUser.username);
      }
    });

    return () => {
      // Remove listener to avoiding memory leak
      socket.removeListener(CHAT_NEW_MESSAGE);
      socket.removeListener(USER_LIST);
    };
  }, [selectedUser]);

  const onUserClick = useCallback((user) => {
    setSelectedUser(user);
    setUnreadById({
      [user.id]: false,
    });
  }, []);

  const onLogoutClick = useCallback(() => {
    localStorage.clear()
    socket.disconnect()
    navigate('/login')
  }, []);

  const handleMessageSent = useCallback(({ to, content }) => {
    setMessagesById((current) => {
      const newMessage = {
        content,
        fromSelf: true,
      };
      // Clone current state
      const cloned = structuredClone(current);

      // Get messages by user id
      let messages = cloned[to];
      if (Array.isArray(messages)) {
        messages.push(newMessage);
      } else {
        messages = [newMessage];
      }

      // Set new messages array to cloned
      cloned[to] = messages;

      return cloned;
    });
  }, []);

  return (
    <div className="flex-1 flex flex-row h-screen">
      <OnlineUsers
        me={socket}
        users={users}
        unreadById={unreadById}
        selectedUser={selectedUser}
        onUserClick={onUserClick}
        onLogoutClick={onLogoutClick}
      />
      {selectedUser ? (
        <div className="flex flex-1 flex-col">
          <ChatHeader selectedUser={selectedUser} />
          <ChatBox messages={messagesById[selectedUser?.id] ?? []} />
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
