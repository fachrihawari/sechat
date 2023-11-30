import { initialName } from "../helpers/name";

export default function ChatBox({ messages }) {
  return (
    <div
      id="messages"
      className="flex flex-col flex-1 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {messages.map((message) => (
        <ChatItem {...message} />
      ))}
    </div>
  );
}

function ChatItem(props) {
  const { fromSelf, content } = props;

  return (
    <div className="chat-message">
      <div className={`flex items-end ${fromSelf ? "justify-end" : ""}`}>
        <div
          className={`flex flex-col space-y-2 text-sm max-w-xs sm:max-w-xl mx-2 ${
            fromSelf ? "order-1 items-end" : "order-2 items-start"
          }`}
        >
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block ${
                fromSelf
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-gray-300 text-gray-600"
              }`}
            >
              {content}
            </span>
          </div>
        </div>
        <div
          className={`relative inline-flex items-center justify-center w-6 h-6 sm:w-12 sm:h-12 overflow-hidden rounded-full ${
            fromSelf
              ? "order-2 text-white bg-blue-600"
              : "order-1 text-white bg-gray-600"
          }`}
        >
          <span className="font-medium">
            {initialName(selectedUser.username)}
          </span>
        </div>
      </div>
    </div>
  );
}
