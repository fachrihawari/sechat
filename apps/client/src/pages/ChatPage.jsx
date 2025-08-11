import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import http from "../config/http";

import ChatBox from "../components/ChatBox";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import ChatUsers from "../components/ChatUsers";
import socket from "../config/socket";
import useSocketById from "../hooks/useSocketById";
import useMessagesById from "../hooks/useMessagesById";
import useSocketConnect from "../hooks/useSocketConnect";

function ChatPage() {
  const navigate = useNavigate();

  // Connect to socket with auth
  useSocketConnect();

  // Map of socket by user id
  const socketById = useSocketById();
  const [selectedUser, setSelectedUser] = useState(null);
  const { messagesById, setMessagesById, unreadById, setUnreadById } =
    useMessagesById({ selectedUser });
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await http.get("/users");
      return data;
    },
  });
  const { data: chats, refetch } = useQuery({
    queryKey: ["chats", selectedUser?._id],
    queryFn: async () => {
      if (!selectedUser?._id) {
        throw new Error("Please select a user")
      }

      const { data } = await http.get("/users/" + selectedUser?._id + "/chats");
      return data;
    }
  })

  useEffect(() => {
    setMessagesById(current => {
      const cloned = structuredClone(current)
      cloned[selectedUser?._id] = chats
      return cloned
    })
  }, [chats, selectedUser])

  useEffect(() => {
    refetch()
    setSelectedUser((current) => {
      if (current) {
        return {
          ...current,
          socketId: socketById[current._id],
        };
      }
      return current
    })
  }, [socketById]);

  const onUserClick = useCallback(
    (user) => {
      setSelectedUser({ ...user, socketId: socketById[user._id] });
      setUnreadById({
        [user._id]: false,
      });
    },
    [socketById]
  );

  const onLogoutClick = useCallback(() => {
    localStorage.clear();
    socket.disconnect();
    navigate("/login");
  }, []);

  const handleMessageSent = useCallback((message) => {
    setMessagesById((current) => {
      const newMessage = {
        ...message,
      };
      // Clone current state
      const cloned = structuredClone(current);

      // Get messages by user id
      let messages = cloned[newMessage.receiver._id];
      if (Array.isArray(messages)) {
        messages.push(newMessage);
      } else {
        messages = [newMessage];
      }

      // Set new messages array to cloned
      cloned[newMessage.receiver._id] = messages;

      return cloned;
    });
  }, []);

  return (
    <div className="flex-1 flex flex-row h-screen">
      {!isPending && (
        <ChatUsers
          me={socket}
          users={users}
          socketById={socketById}
          unreadById={unreadById}
          selectedUser={selectedUser}
          onUserClick={onUserClick}
          onLogoutClick={onLogoutClick}
        />
      )}
      {selectedUser ? (
        <div className="flex flex-1 flex-col">
          <ChatHeader selectedUser={selectedUser} />
          <ChatBox
            chats={messagesById[selectedUser?._id] ?? []}
            selectedUser={selectedUser}
          />
          <ChatInput selectedUser={selectedUser} onSent={handleMessageSent} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <span className="text-xl text-gray-800 font-semibold">Select a user to start chatting</span>
          <span className="text-sm text-gray-500 mt-2">Your conversations will appear here</span>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
