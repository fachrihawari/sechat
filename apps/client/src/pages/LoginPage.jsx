import { useNavigate } from "react-router-dom";
import socket from "../config/socket";

function LoginPage() {
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    localStorage.setItem("username", username);
    socket.auth = { username };
    socket.connect();
    navigate("/chat");
  };

  return (
    <div className="flex-1 flex flex-row items-center justify-center bg-gray-200 h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleJoin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl text-center">Sechat</h1>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4 text-center"
            id="username"
            type="text"
            placeholder="Your username..."
            required
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
