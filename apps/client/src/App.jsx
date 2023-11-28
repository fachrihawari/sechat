import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import {
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import OtpPage from "./pages/OtpPage";

const redirectIfAuthenticated = () => {
  if (localStorage.getItem("accessToken")) {
    throw redirect("/");
  }
  return null;
}
const redirectIfUnauthenticated = () => {
  if (!localStorage.getItem("accessToken")) {
    throw redirect("/login");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: redirectIfAuthenticated,
  },
  {
    path: "/otp",
    element: <OtpPage />,
    loader: redirectIfAuthenticated,
  },
  {
    path: "/",
    element: <ChatPage />,
    loader: redirectIfUnauthenticated
  },
]);

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App;
