
import React from 'react';
// import SignupNavbar from './components/SignupNavbar';
import Footer from '../../componets/Footer';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../componets/authContext';
import { useNavigate } from 'react-router';

const Signup = ({user,setUser}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();
  const { login } = useAuth();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };
  const navigate = useNavigate();

  const submit = async (data) => {
    await delay(1); // simulating network delay
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }


      // console.log(result);
      // setUser(result.user)
      // navigate to login page or handle successful signup
      navigate('/Login');

    } catch (error) {
      // console.error('Error submitting form:', error.message);
      setError('submitError', { type: 'manual', message: error.message });
    }
  };

  return (
    <>
      {isSubmitting && <div>Loading...</div>}
      <div className="flex flex-col min-h-screen">
        {/* <SignupNavbar /> */}
        {errors.submitError && <p className="text-red-500 text-lg text-center mb-4 mt-10">{errors.submitError.message}</p>}
        <div className="flex items-center flex-col sm:flex-row 2xl:gap-44 xl:gap-44 lg:gap-32 lg:pb-20 md:gap-16 md:pb-20 sm:gap-10 sm:pb-16">
          <div className="img flex justify-center  sm:justify-start items-center pb-10 sm:my-0">
            <img className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-[1000px]" src="../SignupBg.jpg" alt="Signup Background" />
          </div>

          <form onSubmit={handleSubmit(submit)} className="SignU flex space-y-3 flex-col items-center sm:items-start 2xl:mt-28 xl:mt-20 lg:mt-16 lg:gap-5 md:gap-5 md:mt-16 sm:mt-10">
            <div className='flex flex-col items-center sm:items-start gap-5'>
              <h1 className='font-medium text-2xl sm:text-3xl tracking-wider md:tracking-normal'>Create an account</h1>
              <p className='font-medium text-gray-700 sm:text-gray-950'>Enter your details below</p>
            </div>

            <input {...register("username", {
              required: "This field is required",
              minLength: { value: 3, message: "Min length is 3" },
              maxLength: { value: 9, message: "Max length is 9" }
            })}
              id="username"
              type="text"
              placeholder="Username"
              className="w-full max-w-xs border-0 border-b-2 border-gray-500 focus:border-gray-500 focus:outline-none transition-colors duration-300"
            />
            {errors.username && <div className='text-red-500'>{errors.username.message}</div>}

            <input {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
              }
            })}
              id='email'
              type="email"
              placeholder="Email"
              className="w-full max-w-xs border-0 border-b-2 border-gray-500 focus:border-gray-500 focus:outline-none transition-colors duration-300"
            />
            {errors.email && <div className='text-red-500'>{errors.email.message}</div>}

            <input {...register("password", {
              required: "This field is required",
              minLength: { value: 7, message: "Min length of password is 7" }
            })}
              id='password'
              type="password"
              placeholder="Password"
              className="w-full max-w-xs border-0 border-b-2 border-gray-500 focus:border-gray-500 focus:outline-none transition-colors duration-300"
            />
            {errors.password && <div className='text-red-500'>{errors.password.message}</div>}

            <div className="buttons flex flex-col w-full pt-5">
              <div className="btn flex justify-center sm:justify-start items-center pb-5 lg:pb-4 md:pb-3">
                <button disabled={isSubmitting} type='submit' className="bg-[#DB4444] hover:bg-red-600 w-full px-24 py-3 text-white">Create Account</button>
              </div>
              <div className="btn flex justify-center sm:justify-start items-center pb-5 lg:pb-4 md:pb-3">
                <button type="button" className="bg-white w-full text-gray-500 font-bold flex gap-3 text-lg items-center px-16 py-3 shadow-md  " onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`}>
                  <span><img width={25} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" alt="" /></span><span>Continue with Google</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Signup;

