export default function OnlineUsers({
  me,
  users,
  onUserClick,
  unreadById,
  selectedUser,
}) {
  return (
    <div className="w-64 md:w-96 border-r-2">
      <div className="border-b-2 p-3">
        <h1 className="text-2xl">Hi {me?.auth?.username}</h1>
        <p className="text-sm">ID: {me.id}</p>
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
            key={user.username}
            className={`flex items-center px-3 h-16 border-b-2 ${
              user.username === selectedUser?.username &&
              "bg-blue-600 text-white"
            }`}
          >
            {user.username}{" "}
            {unreadById[user.id] && (
              <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 ml-2">
                New Messages
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
