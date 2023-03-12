import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem("username")) {
        throw redirect("/chat");
      }
      return null;
    },
  },
  {
    path: "/chat",
    element: <ChatPage />,
    loader: () => {
      if (!localStorage.getItem("username")) {
        throw redirect("/");
      }
      return null;
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
