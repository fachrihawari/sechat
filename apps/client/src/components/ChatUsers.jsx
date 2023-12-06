export default function ChatUsers({
  me,
  users,
  onUserClick,
  unreadById,
  socketById,
  selectedUser,
  onLogoutClick
}) {
  return (
    <div className="w-64 md:w-96 border-r-2">
      <div className="border-b-2 p-3">
        <h1 className="text-2xl">Hi {me?.auth?.user.username}</h1>
        <p className="text-sm">ID: {me?.auth?.user._id}</p>
        <button onClick={onLogoutClick} className="mt-2 w-full bg-red-400 text-white px-4 py-2 border rounded-xl">Logout</button>
      </div>
      {!users.length && (
        <span className="flex items-center px-3 h-16 border-b-2">
          No online users at the moment!
        </span>
      )}
      <ul>
        {users.map((user) => (
          <li
            onClick={() => onUserClick(user)}
            key={user._id}
            className={`flex items-center px-3 h-16 border-b-2 ${user.username === selectedUser?.username &&
              "bg-blue-600 text-white"
              }`}
          >
            {user.username}{" "}
            {unreadById[user._id] && (
              <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 ml-2">
                New Messages
              </span>
            )}
            {socketById[user._id] && (
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 ml-2">
                Online
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
