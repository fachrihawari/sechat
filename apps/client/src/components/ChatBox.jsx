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
      className="flex flex-col flex-1 gap-3 p-4 overflow-y-auto bg-blue-50 scrollbar-thumb-blue-200 scrollbar-track-blue-100 scrollbar-thumb-rounded scrollbar-w-2"
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
          className={`flex flex-col text-sm max-w-xs sm:max-w-xl mx-2 ${fromMe ? "order-1 items-end" : "order-2 items-start"}`}
        >
          <div>
            <span
              className={`px-4 py-2 inline-block rounded-lg ${fromMe
                ? "rounded-br-none bg-blue-500 text-white"
                : "rounded-bl-none bg-white text-gray-700 border border-blue-100"
              }`}
              style={{ boxShadow: 'none' }}
            >
              {message}
            </span>
          </div>
        </div>
        <div
          className={`relative inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 overflow-hidden rounded-lg ${fromMe
            ? "order-2 text-white bg-blue-500"
            : "order-1 text-white bg-gray-400"
          }`}
          style={{ boxShadow: 'none' }}
        >
          <span className="font-medium text-xs sm:text-base">{aliasName}</span>
        </div>
      </div>
    </div>
  );
}
