import { initialName } from "../helpers/name";
import socket from "../config/socket";
import { useEffect, useRef } from "react";

export default function ChatBox({ chats, selectedUser }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scroll({ top: ref.current.scrollHeight, behavior: "smooth" })
    }
  }, [chats]);

  return (
    <div
      ref={ref}
      id="chats"
      className="flex flex-col flex-1 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {chats.map((chat, i) => (
        <ChatItem key={i} chat={chat} selectedUser={selectedUser} />
      ))}
    </div>
  );
}

function ChatItem(props) {
  const { selectedUser, chat } = props;
  const { message, sender } = chat;
  console.log(props)

  const fromMe = socket.auth.user._id === sender?._id // socket.auth.user._id ===
  const chatUser = fromMe ? socket.auth.user.username : selectedUser.username;
  const aliasName = initialName(chatUser);

  return (
    <div className="chat-message">
      <div className={`flex items-end ${fromMe ? "justify-end" : ""}`}>
        <div
          className={`flex flex-col space-y-2 text-sm max-w-xs sm:max-w-xl mx-2 ${fromMe ? "order-1 items-end" : "order-2 items-start"
            }`}
        >
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block ${fromMe
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-gray-300 text-gray-600"
                }`}
            >
              {message}
            </span>
          </div>
        </div>
        <div
          className={`relative inline-flex items-center justify-center w-6 h-6 sm:w-12 sm:h-12 overflow-hidden rounded-full ${fromMe
              ? "order-2 text-white bg-blue-600"
              : "order-1 text-white bg-gray-600"
            }`}
        >
          <span className="font-medium">{aliasName}</span>
        </div>
      </div>
    </div>
  );
}
