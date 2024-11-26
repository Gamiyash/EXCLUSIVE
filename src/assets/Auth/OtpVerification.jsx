import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpVerification = ({ setUser }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('emailForOtp'); // Retrieve the email used for login

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/VerifyOtp`, { email, otp });

      if (response.data.success) {
        setSuccess('Login successful');
        setUser(response.data.user);
        navigate('/'); // Redirect to the homepage or protected route
      } else {
        setError(response.data.message);
        navigate('/verify-otp')
      }
    } catch (error) {
      setError('An error occurred during verification');
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full">
      <h2 className="text-3xl font-bold text-center text-[#DB4444] mb-4">Verify OTP</h2>
      <p className="text-center text-gray-600 mb-6">
        Enter the OTP sent to your registered email to verify your identity.
      </p>
      <form onSubmit={verifyOtp} className="space-y-6">
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#DB4444] focus:border-[#DB4444] transition duration-200"
            placeholder="Enter OTP"
          />
        </div>
        {success && <p className="text-center text-green-600 font-medium">{success}</p>}
        {error && <p className="text-center text-red-600 font-medium">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#DB4444] text-white py-2 rounded-lg font-semibold shadow-md hover:bg-[#c33c3c] transition duration-200"
        >
          Verify OTP
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        Didn't receive the OTP?{" "}
        <button
          onClick={() => alert("Feature is coming soon")} // Replace with actual logic
          className="text-[#DB4444] hover:underline font-medium"
        >
          Resend OTP
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default OtpVerification;
