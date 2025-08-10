import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import http from "../config/http";
import { toast } from 'react-toastify'

function OtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams()

  const verify = useMutation({
    mutationFn: (body) => http.post("/auth/verify", body),
  })

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const { data: { accessToken, user } } = await verify.mutateAsync({
        email: searchParams.get('email'),
        otp
      })
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('_id', user._id)
      localStorage.setItem('username', user.username)
      localStorage.setItem('email', user.email)
      navigate('/')
      toast.success("Welcome to sechat")
    } catch (error) {
      toast.error(error.response?.data?.message || "Opps! Something went wrong")
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-8 flex flex-col items-center border border-blue-100">
          <div className="mb-6 flex flex-col items-center">
            <div className="w-14 h-14 rounded-lg bg-blue-600 flex items-center justify-center mb-2">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">OTP Verification</h1>
            <span className="text-gray-400 text-sm mt-1">Enter the code sent to your email</span>
          </div>
          <form onSubmit={handleVerify} className="w-full flex flex-col gap-3">
            <label htmlFor="email" className="text-gray-700 font-medium">Email Address</label>
            <input
              id="email"
              name="email"
              defaultValue={searchParams.get('email')}
              disabled
              type="email"
              className="border border-blue-200 rounded-md px-4 py-3 text-gray-700 bg-blue-50 placeholder-gray-400 text-center focus:outline-none focus:border-blue-400"
              placeholder="Your email..."
              required
            />
            <label htmlFor="otp" className="text-gray-700 font-medium">OTP Code</label>
            <input
              id="otp"
              name="otp"
              value={otp}
              disabled={verify.isPending}
              onChange={e => setOtp(e.target.value)}
              className="border border-blue-200 rounded-md px-4 py-3 text-gray-700 bg-blue-50 placeholder-gray-400 text-center focus:outline-none focus:border-blue-400"
              placeholder="Enter 6-digit code"
              required
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
            />
            <button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-0 border-0 transition"
              type="submit"
              disabled={verify.isPending}
              style={{ boxShadow: 'none' }}
            >
              {verify.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Loading...
                </span>
              ) : 'Verify'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
