export default function ChatUsers({
  me,
  users,
  onUserClick,
  unreadById,
  socketById,
  selectedUser,
  onLogoutClick,
}) {
  return (
    <div className="min-w-0 w-full sm:w-64 md:w-80 border-r border-blue-100 min-h-screen flex flex-col max-h-screen">
      <div className="border-b border-blue-100 p-3 sm:p-5 flex flex-col gap-2">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Hi {me?.auth?.user.username}</h1>
        <p className="text-xs text-gray-400 truncate">ID: {me?.auth?.user._id}</p>
        <button
          onClick={onLogoutClick}
          className="mt-2 w-full bg-red-500 hover:bg-red-400 text-white font-medium py-1.5 sm:py-2 rounded-md focus:outline-none focus:ring-0 border-0 transition text-sm sm:text-base"
          style={{ boxShadow: 'none' }}
        >
          Logout
        </button>
      </div>
      {!users.length && (
        <span className="flex items-center px-5 h-16 border-b border-blue-100 text-gray-400">
          No online users at the moment!
        </span>
      )}
      <ul className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent">
        {users.map((user) => (
          <li
            onClick={() => onUserClick(user)}
            key={user._id}
            className={`flex items-center px-5 h-16 border-b border-blue-100 cursor-pointer select-none transition-colors ${user.username === selectedUser?.username ? "bg-blue-50 text-blue-700" : "hover:bg-blue-50 text-gray-700"}`}
          >
            <span className={`${socketById[user._id] ? 'bg-green-500' : 'bg-gray-300'} mr-3 rounded-full w-3 h-3`} />
            <span className="flex-1 truncate">{user.username}</span>
            {unreadById[user._id] && (
              <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded ml-2">
                new
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
