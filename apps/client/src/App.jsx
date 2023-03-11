import ChatBox from "./components/ChatBox";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ActiveUsers from "./components/ActiveUsers";

function App() {
  return (
    <div className="flex-1 flex flex-row h-screen">
      <ActiveUsers />
      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <ChatBox />
        <ChatInput />
      </div>
    </div>
  );
}

export default App;
