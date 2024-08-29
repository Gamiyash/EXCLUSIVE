

// export default Signup;
// Signup.jsx
import React from 'react';
// import SignupNavbar from './components/SignupNavbar';
import Footer from '../../componets/Footer';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../componets/authContext';
import { useNavigate } from 'react-router';

const Signup = () => {
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
    await delay(2); // simulating network delay
    try {
      const response = await fetch('http://localhost:3000/Signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }
      

      console.log(result);
      setUser(result.user)
      // navigate to login page or handle successful signup
      navigate('/Login');

    } catch (error) {
      console.error('Error submitting form:', error.message);
      setError('submitError', { type: 'manual', message: error.message });
    }
  };

  return (
    <>
      {isSubmitting && <div>Loading...</div>}
      <div className="flex flex-col min-h-screen">
        {/* <SignupNavbar /> */}
        {errors.submitError && <p className="text-red-500 text-lg text-center mb-4">{errors.submitError.message}</p>}
        <div className="flex items-center flex-col sm:flex-row 2xl:gap-44 xl:gap-44 lg:gap-32 lg:pb-20 md:gap-16 md:pb-20 sm:gap-10 sm:pb-16">
          <div className="img flex justify-center pt-12 sm:justify-start items-center my-14 sm:my-0">
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
                <button disabled={isSubmitting} type='submit' className="bg-[#DB4444] hover:bg-red-600 px-24 py-3 text-white">Create Account</button>
              </div>
              <div className="btn flex justify-center sm:justify-start items-center pb-5 lg:pb-4 md:pb-3">
                <button type="button" className="bg-[#DB4444] px-24 py-3 text-white"  onClick={() => window.location.href = 'http://localhost:3000/api/auth/google'}>Continue with Google</button>
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

