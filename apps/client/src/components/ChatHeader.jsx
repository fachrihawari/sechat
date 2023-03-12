import { initialName } from "../helpers/name";

export default function ChatHeader({ selectedUser }) {
  return (
    <div className="flex sm:items-center justify-between p-3 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {initialName(selectedUser.username)}
          </span>
        </div>

        <div className="flex flex-col leading-tight">
          <div className="text-xl font-medium mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{selectedUser.username}</span>
          </div>
          <span className="text-gray-600">{selectedUser.id}</span>
        </div>
      </div>
    </div>
  );
}
