import { socketEvents } from "@sechat/shared";
import { useMutation } from "@tanstack/react-query";
import socket from "../config/socket";
import http from "../config/http";

const { CHAT_NEW_MESSAGE } = socketEvents

export default function ChatInput({ selectedUser, onSent }) {
  const createChat = useMutation({
    mutationFn: (body) => http.post(`/users/${selectedUser?._id}/chats`, body),
  });

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await createChat.mutateAsync({
        message: e.target[0].value,
      });

      if (selectedUser.socketId) {
        socket.emit(CHAT_NEW_MESSAGE, {
          receiver: selectedUser.socketId,
          message: e.target[0].value,
        });
      }
      
      onSent({
        sender: {
          _id: socket.auth.user._id,
        },
        receiver: {
          _id: selectedUser._id,
        },
        message: e.target[0].value
      });
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSend} className="border-t border-blue-100 bg-white p-4 flex items-center gap-2">
      <input
        type="text"
        placeholder="Write your message..."
        className="flex-1 border border-blue-200 rounded-md px-4 h-12 text-gray-800 bg-blue-50 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition text-base"
        autoComplete="off"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 h-12 rounded-md focus:outline-none focus:ring-0 border-0 transition text-base flex items-center justify-center"
        style={{ boxShadow: 'none' }}
      >
        Send
      </button>
    </form>
  );
}
