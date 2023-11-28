import { createSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import http from "../config/http";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const login = useMutation({
    mutationFn: (body) => http.post("/login", body),
  })

  const handleLogin = async (e) => {
    e.preventDefault();
   
    try {
      await login.mutateAsync({ email })
      navigate({
        pathname: "/otp",
        search: createSearchParams({ email }).toString(),
      });
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="flex-1 flex flex-row items-center justify-center bg-gray-200 h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl text-center">Login</h1>
          <input
            name='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4 text-center"
            placeholder="Your email..."
            required
            disabled={login.isPending}
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {login.isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
