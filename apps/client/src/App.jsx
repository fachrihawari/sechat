import ChatBox from "./components/ChatBox";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ActiveUsers from "./components/ActiveUsers";
import socket from "./config/socket";
import { useEffect, useState } from "react";

function App() {
  const [activeIds, setActiveIds] = useState([]);

  useEffect(() => {
    socket.on("active-ids", (ids) => {
      setActiveIds(ids.filter((id) => id !== socket.id));
    });

    return () => {
      socket.removeListener("active-ids");
    };
  }, []);

  return (
    <div className="flex-1 flex flex-row h-screen">
      <ActiveUsers myId={socket.id} activeIds={activeIds} />
      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <ChatBox />
        <ChatInput />
      </div>
    </div>
  );
}

export default App;
