/**
 *
 * @param {object} props
 * @param {object[]} props.messages
 * @returns
 */
export default function ChatBox(props) {
  return (
    <div
      id="messages"
      className="flex flex-col flex-1 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <ChatItem isSender />
      <ChatItem />
      <ChatItem isSender />
      <ChatItem />
      <ChatItem isSender />
      <ChatItem />
      <ChatItem isSender />
      <ChatItem />
    </div>
  );
}

function ChatItem(props) {
  const { isSender } = props;

  return (
    <div className="chat-message">
      <div className={`flex items-end ${isSender ? "justify-end" : ""}`}>
        <div
          className={`flex flex-col space-y-2 text-sm max-w-xs sm:max-w-xl mx-2 ${
            isSender ? "order-1 items-end" : "order-2 items-start"
          }`}
        >
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block ${
                isSender
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-gray-300 text-gray-600"
              }`}
            >
              Your error message says permission denied, npm global installs
              must be given root privileges.
            </span>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
          alt="My profile"
          className={`w-6 h-6 sm:w-12 sm:h-12 rounded-full ${
            isSender ? "order-2" : "order-1"
          }`}
        />
      </div>
    </div>
  );
}
