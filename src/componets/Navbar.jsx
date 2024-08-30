// import React, { useState } from 'react';
// import { CiSearch, CiHeart } from "react-icons/ci";
// import { IoCartOutline } from "react-icons/io5";
// import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';

// const Navbar = ({ user, setUser }) => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setUser(null);
//     setDropdownVisible(false);
//   };

//   const RedirectToSignup = () => {
//     navigate('/Signup');
//   };

//   const RedirectToProfile = () => {
//     navigate('/Profile');
//   };

//   return (
//     <>
//       <nav className='flex justify-around items-center pt-5'>
//         <div className="logo font-bold text-xl tracking-wider">Exclusive</div>
//         <ul className="flex gap-14">
//           <li className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Home</li>
//           <li className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Contact</li>
//           <li className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">About</li>
//           {!user && (
//             <li onClick={RedirectToSignup} className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Sign Up</li>
//           )}
//         </ul>

//         <div className='flex justify-center items-center gap-7'>
//           <div className="input">
//             <input className='relative flex rounded-sm w-[240px] px-3 bg-slate-100 cursor-pointer' type="text" placeholder='What are you looking for?' />
//           </div>
//           <CiSearch size={25} />
//           <CiHeart size={25} />
//           <IoCartOutline size={25} />
//           {user ? (
//             <div className="relative">
//               <button onClick={() => setDropdownVisible(!dropdownVisible)} className="bg-gray-800 text-white px-4 py-2 rounded-md">
//                 Profile
//               </button>
//               {dropdownVisible && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
//                   <button onClick={RedirectToProfile} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</button>
//                   <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login" className=" text-black">Login</Link>
//           )}
//         </div>
//       </nav>
//       <div className="line mt-8 h-px bg-gray-600"></div>
//     </>
//   );
// };

// export default Navbar;
import React, { useState, useRef, useEffect } from 'react';
import { CiSearch, CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import SearchComponent from './Search';

const Navbar = ({ user, setUser  }) => {
  console.log('Navbar user:', user);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [buttonColor, setButtonColor] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // useEffect(() => {
  //   // Fetch user data from localStorage
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }

  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownVisible(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [setUser]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout');
      setUser(null);
      localStorage.removeItem('user');
      // localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
    setDropdownVisible(false);
  };

  const redirectToCart = () => {
    navigate('/Cart');
  }

  const redirectToWishList = () => {
    navigate('/WishList');
  }
  const handleButtonbgchange = () => {
    setDropdownVisible(!dropdownVisible);
    setButtonColor(dropdownVisible ? 'bg-[#DB4444]' : 'bg-[#000000]');
  };
  return (
    <>
      <nav className='flex justify-around items-center pt-5 '>
        <div className="logo font-bold text-xl tracking-wider">Exclusive</div>
        {/* <img width={70} className='rounded-full' src="../logo.jpg" alt="" /> */}
        {/* <img width={70} className='rounded-md w-28 h-16 object-cover transform scale-110' src="../Exclusive1.png" alt="" /> */}
        <ul className="flex gap-14">
          <Link to={"/home"} className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Home</Link>
          <Link className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Contact</Link>
          <Link className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">About</Link>
          {!user && (
            <li onClick={() => navigate('/Signup')} className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Sign Up</li>
          )}
        </ul>

        <div className='flex justify-center items-center gap-7'>
          <div className="input">
            <SearchComponent/>
            {/* <input className='relative flex rounded-sm w-[240px] px-3 bg-slate-100 cursor-pointer' type="text" placeholder='What are you looking for?' /> */}
          </div>
          {/* <CiSearch size={25} className='cursor-pointer' /> */}
          <CiHeart size={25} className='cursor-pointer' onClick={redirectToWishList}  />
          <IoCartOutline size={25} className='cursor-pointer' onClick={redirectToCart} />
          {user ? (
            <div className="relative flex items-center " ref={dropdownRef}>
              <button onClick={() => handleButtonbgchange()}  className={` w-10 ${dropdownVisible ? 'bg-[#DB4444]':""}  h-10 flex items-center  justify-center  rounded-full `}>
                {/* <CgProfile size={25} /> */} <img  width={25} className={` ${dropdownVisible ? 'invert':""}`} src="Profile.png" alt="" />
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 top-8 mt-2 w-56 bg-gradient-to-r opacity-[90%] from-gray-900 via-gray-800 to-gray-600  bg-opacity-[20%] text-opacity-[80%] backdrop-filter: blur(16px); bg-clip-content text-white border rounded shadow-lg ">
                  <Link to="/Profile" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700"> <span><CgProfile size={25} /></span>Manage My Account</Link>
                  <Link to="/Profile" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700"> <span><BsBagCheck size={25} /></span>My Orders</Link>
                  <Link to="/Profile" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700"> <span><MdOutlineCancel size={25} /></span>My cancellations</Link>
                  <Link to="/Profile" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700"> <span><CiStar size={25} /></span>My Reviews</Link>
                  <button onClick={handleLogout} className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700"><span><BiLogOut size={25} /></span>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className=" text-black">Login</Link>
          )}
        </div>
      </nav>
      <div className="line mt-8 h-px bg-gray-600"></div>
    </>
  );
};

export default Navbar;

