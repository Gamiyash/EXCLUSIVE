import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router';

const SignupNavbar = () => {
    const navigate = useNavigate();

    const RedirectToSignup = () => {
        navigate('/Signup');
    };

    return (
        <>
            <nav className='flex flex-wrap justify-between gap-1 items-center py-6 px-4 sm:px-6 md:px-8 lg:px-12'>
                <div className="logo font-bold text-xl tracking-wider mb-4 sm:mb-0">Exclusive</div>
                <ul className="flex flex-wrap items-center gap-4 sm:gap-8 md:gap-12 ">
                    <li className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Home</li>
                    <li className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Contact</li>
                    <li className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">About</li>
                    <li onClick={RedirectToSignup} className="border-b-2 border-transparent border-slate-500 cursor-pointer">Sign Up</li>
                </ul>
                <div className='flex items-center gap-4 relative'>
                    <input className='rounded-sm w-full h-7 sm:w-[320px] px-4 bg-slate-100 cursor-pointer focus:outline-none' type="text" placeholder='Search here' />
                    <div className="search absolute top-1/2 transform -translate-y-1/2 right-4"><CiSearch /></div>
                </div>
            </nav>
            <div className="line h-px bg-gray-600"></div>
        </>
    );
}

export default SignupNavbar;
