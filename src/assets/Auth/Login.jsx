import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../componets/authContext';
import axios from 'axios';

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    // Use axios to fetch the session data
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/session`, { withCredentials: true })
      .then(response => {
        const data = response.data;
        if (data.user) {
          setUser(data.user);
          login(data.user);
        }
      })
      .catch(err => {
        console.error('Error validating session:', err);
      });
  }, [login]);


  const submit = async (e) => {
    e.preventDefault();



    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Login`,
        // const response = await axios.post(`${process.env.FRONTEND_URL}/Login}`, 
        { email, password },
        { withCredentials: true } // to include cookies with the request
      );

      const data = response.data;
      console.log('Server response:', data);

      if (data.success) {
        const user = data.user;
        // const token = data.token; // Uncomment if you have a token

        // if (!token) {
        //   throw new Error('Token is undefined');
        // }

        setUser(user);
        login(user);
        // localStorage.setItem('token', token); // Uncomment if you have a token
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('emailForOtp', email);

        navigate('/verify-otp'); // Redirect to OTP verification page
      } else {
        throw new Error('User data is undefined');
      }
    } catch (error) {
      // console.error('Error:', error.message || 'Failed to submit form');
      setError(error.response.data.message);
    }
  };
  // if (error) return <p className='text-red-500 pt-20'>{error}</p>

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center flex-col sm:flex-row 2xl:gap-44 xl:gap-44 lg:gap-32 lg:pb-20 md:gap-16 md:pb-20 sm:gap-10 sm:pb-16">
          <div className="img flex justify-center sm:justify-start items-center pb-10 pt-4 sm:my-0">
            <img className='w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-[1000px]' src="../SignupBg.jpg" alt="Signup Background" />
          </div>
          <form onSubmit={submit} className="SignU flex space-y-3 flex-col items-center sm:items-start 2xl:mt-24 xl:mt-20 lg:mt-16 lg:gap-5 md:gap-5 md:mt-16 sm:mt-10">
            {error && <p className="text-red-500 text-lg text-center justify-center items-center ">{error}</p>}
            <div className='flex flex-col items-center sm:items-start gap-5'>
              <h1 className='font-medium text-2xl sm:text-3xl tracking-wider md:tracking-normal'>Login</h1>
              <p className='font-medium text-gray-700 sm:text-gray-950'>Enter your details below</p>
            </div>
            <input
              id='email'
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChangeEmail}
              className="w-full max-w-xs border-0 border-b-2 border-gray-500 focus:border-gray-500 focus:outline-none transition-colors duration-300"
            />
            <input
              id='password'
              type="password"
              value={password}
              onChange={handleChangePassword}
              className="w-full max-w-xs border-0 border-b-2 border-gray-500 focus:border-gray-500 focus:outline-none transition-colors duration-300"
              placeholder="Password"
            />
            <div className="buttons flex flex-col w-full pt-5">
              <div className="btn flex justify-center sm:justify-start items-center pb-5  lg:pb-4 md:pb-3">
                <button type="submit" className="bg-[#DB4444] w-full hover:bg-red-600 px-16 py-3 text-white">Login</button>
              </div>
              <div className='border border-gray-300'>
                <button type="button" className="bg-white w-full text-gray-500 font-bold flex gap-3 text-lg items-center px-16 py-3 shadow-md  " onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`}>
                  <span><img width={25} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" alt="" /></span><span>Continue with Google</span>
                </button>
              </div>
              <span className='flex justify-center items-center mt-3 gap-1 text-black font-medium'>Don't have an account?<a href="/Signup" className='text-blue-500'>Signup</a></span>
            </div>

          </form>
        </div>
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default Login;
