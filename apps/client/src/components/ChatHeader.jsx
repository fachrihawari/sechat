import { initialName } from "../helpers/name";

export default function ChatHeader({ selectedUser }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-blue-100 bg-white">
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center justify-center w-11 h-11 bg-blue-100 rounded-lg">
          <span className="font-semibold text-blue-700 text-lg">
            {initialName(selectedUser.username)}
          </span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-base font-semibold text-gray-800">{selectedUser.username}</span>
          <span className="text-xs text-gray-400">{selectedUser._id}</span>
        </div>
      </div>
    </div>
  );
}
