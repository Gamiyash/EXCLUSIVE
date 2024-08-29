// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const OtpVerification = () => {
// //   const [email, setEmail] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post('http://localhost:3000/VerifyOtp', { email, otp });

// //       if (response.data.success) {
// //         setMessage('Login successful');
// //         // Redirect to another page or update application state
// //       } else {
// //         setError(response.data.message);
// //       }
// //     } catch (error) {
// //       setError('An error occurred during verification');
// //       console.error('Error verifying OTP:', error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
// //       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
// //         <div className="mb-4">
// //           <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
// //           <input
// //             type="email"
// //             id="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
// //           <input
// //             type="text"
// //             id="otp"
// //             value={otp}
// //             onChange={(e) => setOtp(e.target.value)}
// //             required
// //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
// //           />
// //         </div>
// //         {message && <p className="text-green-500">{message}</p>}
// //         {error && <p className="text-red-500">{error}</p>}
// //         <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
// //           Verify OTP
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default OtpVerification;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// const OtpVerification = ({ setUser}) => {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();
//   const email = localStorage.getItem('emailForOtp'); // Retrieve the email used for login

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3000/VerifyOtp', { email, otp });

//       if (response.data.success) {
//         setSuccess('Login successful');
//         // Redirect to the homepage or protected route
//         navigate('/');
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError('An error occurred during verification');
//       console.error('Error verifying OTP:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
//       <form onSubmit={verifyOtp} className="bg-white p-6 rounded shadow-md">
//         <div className="mb-4">
//           <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
//           <input
//             type="text"
//             id="otp"
//             value={otp}
//             onChange={handleOtpChange}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//         {success && <p className="text-green-500">{success}</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
//           Verify OTP
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OtpVerification;
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
      const response = await axios.post('http://localhost:3000/VerifyOtp', { email, otp });

      if (response.data.success) {
        setSuccess('Login successful');
        setUser(response.data.user);
        navigate('/home'); // Redirect to the homepage or protected route
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred during verification');
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <form onSubmit={verifyOtp} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
