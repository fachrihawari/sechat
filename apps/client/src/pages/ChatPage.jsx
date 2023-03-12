import { useCallback, useEffect, useState } from "react";

import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import OnlineUsers from "../components/OnlineUsers";
import socket from "../config/socket";

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadById, setUnreadById] = useState({});
  const [messagesById, setMessagesById] = useState({});

  useEffect(() => {
    // Reconnect if user reload the browser
    if (localStorage.getItem("username")) {
      socket.auth = { username: localStorage.getItem("username") };
      socket.connect();
    }

    // Listen whenever new user connected or disconnected
    socket.on("users", (onlineUsers) => {
      const usersExceptMe = onlineUsers.filter(
        (onlineUser) => onlineUser.username !== socket.auth.username
      );
      setUsers(usersExceptMe);
    });

    return () => {
      // Remove listener to avoiding memory leak
      socket.removeListener("users");
    };
  }, []);

  useEffect(() => {
    socket.on("private-message", ({ content, from }) => {
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

    socket.on("user-disconnected", (id) => {
      if (selectedUser?.id === id) {
        setSelectedUser(null);
        alert("User disconnected " + selectedUser.username);
      }
    });

    return () => {
      // Remove listener to avoiding memory leak
      socket.removeListener("private-message");
    };
  }, [selectedUser]);

  const onUserClick = useCallback((user) => {
    setSelectedUser(user);
    setUnreadById({
      [user.id]: false,
    });
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
