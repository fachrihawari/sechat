import { socketEvents } from '@sechat/shared'
import socket from "../config/socket";

const { CHAT_NEW_MESSAGE } = socketEvents

export default function ChatInput({ selectedUser, onSent }) {
  const handleSend = (e) => {
    e.preventDefault();
    console.log(selectedUser)
    socket.emit(CHAT_NEW_MESSAGE, {
      receiver: selectedUser.socketId,
      content: e.target[0].value,
    });
    onSent({
      receiverSocketId: selectedUser.socketId,
      receiverUserId: selectedUser._id,
      senderUserId: socket.auth.user._id,
      senderSocketId: socket.auth.id,
      content: e.target[0].value,
      fromMe: true
    })
    e.target.reset();
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
