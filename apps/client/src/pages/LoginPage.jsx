import { createSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import http from "../config/http";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const login = useMutation({
    mutationFn: (body) => http.post("/auth/login", body),
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
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-8 flex flex-col items-center border border-blue-100">
          {/* Logo or App Name */}
          <div className="mb-6 flex flex-col items-center">
            <div className="w-14 h-14 rounded-lg bg-blue-600 flex items-center justify-center mb-2">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">sechat</h1>
            <span className="text-gray-400 text-sm mt-1">Sign in to continue</span>
          </div>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
            <label htmlFor="email" className="text-gray-700 font-medium">Email Address</label>
            <input
              id="email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              className="border border-blue-200 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400 placeholder-gray-400 text-center bg-blue-50"
              placeholder="you@example.com"
              required
              disabled={login.isPending}
              autoComplete="email"
            />
            <button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-0 border-0 transition"
              type="submit"
              disabled={login.isPending}
              style={{ boxShadow: 'none' }}
            >
              {login.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Loading...
                </span>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
