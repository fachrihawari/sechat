export default function ActiveUsers({ myId, activeIds }) {
  return (
    <div className="w-64 md:w-96 border-r-2">
      <div className="border-b-2 p-3">
        <h1 className="text-2xl">Active Users</h1>
        <p className="text-sm">ID: {myId}</p>
      </div>
      <ul>
        {activeIds.map((id) => (
          <li key={id} className="flex items-center px-3 h-16 border-b-2">
            {id}
          </li>
        ))}
      </ul>
    </div>
  );
}
