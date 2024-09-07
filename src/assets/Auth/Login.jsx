import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../componets/authContext';
import axios from 'axios';

const Login = ({user,setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // const [user, setUser] = useState(null);
  console.log("Login user is", user)
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    // Use axios to fetch the session data
    axios.get('/api/auth/session', { withCredentials: true })
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
  }, [setUser, login]);


  


// useEffect(() => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     fetch("http://localhost:3000/api/auth/session", {
//       method: "GET",
//       headers: { "Authorization": `Bearer ${token}` }
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.user) {
//         setUser(data.user);
//         login(data.user);
//       } else {
//         localStorage.removeItem('token');
//       }
//     })
//     .catch(err => {
//       console.error('Error validating token:', err);
//       localStorage.removeItem('token');
//     });
//   }
// }, [setUser, login]);


const submit = async (e) => {
  e.preventDefault();

  // try {
  //   const response = await fetch("http://localhost:3000/Login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //     credentials: "include"
  //   });

  //   const data = await response.json();
  //   console.log('Server response:', data);


  //   if (!response.ok) {
  //     throw new Error(data.message || 'Failed to submit form');
  //   }


  //   if (data.success) {
  //     const user = data.user;
  //     // const token = data.token; 

  //     // if (!token) {
  //     //   throw new Error('Token is undefined');
  //     // }

  //     setUser(user);
  //     login(user);
  //     // localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify(user));
  //     localStorage.setItem('emailForOtp', email);

  //     navigate('/verify-otp'); // Redirect to OTP verification page
  //   } else {
  //     throw new Error('User data is undefined');
  //   }


  //   // // setUser(data.user);
  //   // // localStorage.setItem('user', JSON.stringify(data.user));
  //   // localStorage.setItem('emailForOtp', email);
  //   // navigate('/verify-otp'); // Redirect to OTP verification page
  // } catch (error) {
  //   console.error('Error submitting form:', error.message);
  //   setError(error.message);
  // }

  try {
    const response = await axios.post("http://localhost:3000/Login", 
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
    console.error('Error:', error.message || 'Failed to submit form');
  }
};

return (
  <>
    <div className="flex flex-col min-h-screen">
      {error && <p className="text-red-500 text-lg text-center mb-4">{error}</p>}
      <div className="flex items-center flex-col sm:flex-row 2xl:gap-44 xl:gap-44 lg:gap-32 lg:pb-20 md:gap-16 md:pb-20 sm:gap-10 sm:pb-16">
        <div className="img flex justify-center pt-12 sm:justify-start items-center my-14 sm:my-0">
          <img className='w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-[1000px]' src="../SignupBg.jpg" alt="Signup Background" />
        </div>
        <form onSubmit={submit} className="SignU flex space-y-3 flex-col items-center sm:items-start 2xl:mt-28 xl:mt-20 lg:mt-16 lg:gap-5 md:gap-5 md:mt-16 sm:mt-10">
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
          <div className="buttons flex w-full pt-5">
            <div className="btn flex justify-center sm:justify-start items-center pb-5 lg:pb-4 md:pb-3">
              <button type="submit" className="bg-[#DB4444] hover:bg-red-600 px-24 py-3 text-white">Login</button>
            </div>
          </div>
          <button type="button" className="bg-[#DB4444] px-24 py-3 text-white" onClick={() => window.location.href = 'http://localhost:3000/api/auth/google'}>Continue with Google</button>
        </form>
      </div>
      {/* <Footer/> */}
    </div>
  </>
);
};

export default Login;
