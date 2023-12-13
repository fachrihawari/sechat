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
    <form onSubmit={handleSend} className="border-t-2 border-gray-200 p-4">
      <input
        type="text"
        placeholder="Write your message!"
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md p-3"
      />
    </form>
  );
}
