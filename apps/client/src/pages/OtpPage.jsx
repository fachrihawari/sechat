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
    mutationFn: (body) => http.post("/verify", body),
  })

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const { data: { accessToken } } = await verify.mutateAsync({
        email: searchParams.get('email'),
        otp
      })
      localStorage.setItem('accessToken', accessToken)
      navigate('/')
      toast.success("Welcome to sechat")
    } catch (error) {
      toast.error(error.response?.data?.message || "Opps! Something went wrong")
    }
  };


  return (
    <div className="flex-1 flex flex-row items-center justify-center bg-gray-200 h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleVerify}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl text-center">Verify</h1>
          <input
            name='email'
            defaultValue={searchParams.get('email')}
            disabled
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4 text-center"
            placeholder="Your email..."
            required
          />
          <input
            name='otp'
            value={otp}
            disabled={verify.isPending}
            onChange={e => setOtp(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 text-center"
            placeholder="OTP Code..."
            required
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {verify.isPending ? 'Loading...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpPage;
