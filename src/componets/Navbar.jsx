
import React, { useState, useRef, useEffect } from 'react';
import { CiSearch, CiHeart, } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { MdContactSupport } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLogin } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { BiCookie, BiLogOut } from "react-icons/bi";
import SearchComponent from './Search';
import axios from 'axios';

const Navbar = ({ user, setUser }) => {
  // console.log('Navbar user:', user);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [Menu, setMenu] = useState(false)
  const menueRef = useRef(null)
  const dropdownRef = useRef(null);
  const [buttonColor, setButtonColor] = useState('');
  const [isadmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/session`, { withCredentials: true });

        if (response.data.user.isAdmin) {
          setIsAdmin(true);
        }
        console.log('Admin:', response.data.user.isAdmin);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    checkAdminStatus();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (menueRef.current && !menueRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout');
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('hasSpunWheel')
      // localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
    setDropdownVisible(false);
    setMenu(false)
  };

  const redirectToCart = () => {
    if (!user) {
      alert('Please log in to access your cart.'); // Show message or redirect to login
      navigate('/login');
    }
    else {
      navigate('/Cart');
    }
  }

  const redirectToWishList = () => {
    if (!user) {
      alert('Please log in to access your cart.'); // Show message or redirect to login
      navigate('/login');
    }
    else {
      navigate('/WishList');
    }
  }
  const handleButtonbgchange = () => {
    setDropdownVisible(!dropdownVisible);
    setButtonColor(dropdownVisible ? 'bg-[#DB4444]' : 'bg-[#000000]');
  };
  const handleMenuechange = () => {
    setMenu(!Menu);
    // setButtonColor(dropdownVisible ? 'bg-[#DB4444]' : 'bg-[#000000]');
  };
  return (
    <>

      <nav className='flex justify-around items-center pt-3 '>
        <div className="logo font-bold text-xl tracking-wider">Exclusive</div>
        <ul className="flex gap-14">
          <Link to={"/"} className="hidden text-sm xl:block hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Home</Link>
          <Link to={"/contact"} className="hidden xl:block text-sm hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Contact</Link>
          <Link to={"/about"} className="hidden xl:block text-sm hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">About</Link>
          {/* {!user && (
              <li onClick={() => navigate('/Signup')} className="hover:border-b-2 border-transparent hover:border-slate-500 cursor-pointer">Sign Up</li>
            )} */}
        </ul>

        <div className='flex justify-center items-center gap-3 xl:gap-7'>
          <div className="input">
            <SearchComponent />
            {/* <input className='relative flex rounded-sm w-[240px] px-3 bg-slate-100 cursor-pointer' type="text" placeholder='What are you looking for?' /> */}
          </div>
          {/* <CiSearch size={25} className='cursor-pointer' /> */}
          <CiHeart size={20} className='cursor-pointer hidden xl:block' onClick={redirectToWishList} />
          <IoCartOutline size={20} className='cursor-pointer hidden xl:block' onClick={redirectToCart} />
          {user ? (
            <div className="relative flex items-center " ref={dropdownRef}>
              <button onClick={() => handleButtonbgchange()} className={` w-10 ${dropdownVisible ? 'bg-[#DB4444]' : ""}  h-10 flex items-center  justify-center  rounded-full `}>
                <img width={20} className={` ${dropdownVisible ? 'invert' : ""}`} src="Profile.png" alt="" />
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 xl:text-sm top-8 mt-2 w-56 bg-gradient-to-r opacity-[90%] from-gray-900 via-gray-800 to-gray-600  bg-opacity-[20%] text-opacity-[80%] backdrop-filter: blur(16px); bg-clip-content text-white border rounded shadow-lg ">
                        {isadmin &&  <Link to="/admin-dashboard" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><CgProfile size={25} /></span>Admin</Link>}
                  <Link to="/Profile" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><CgProfile size={25} /></span>Manage My Account</Link>
                  <Link to="/orderHistory" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><BsBagCheck size={25} /></span>My Orders</Link>
                  <Link to="/Profile" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><MdOutlineCancel size={25} /></span>My cancellations</Link>
                  <Link to="/Profile" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><CiStar size={25} /></span>My Reviews</Link>
                  <button onClick={handleLogout} className="block px-4 w-full py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"><span><BiLogOut size={25} /></span>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className=" text-black">Login</Link>
          )}
          <div className="DropDownMenue  flex-col relative xl:hidden block" ref={menueRef}>
            <div className="icon text-gray-500 cursor-pointer" onClick={() => handleMenuechange()}>
              <RxHamburgerMenu size={25} />
            </div>
            <div className='flex relative items-center'>
              {Menu && (
                <div className="flex flex-col items-start absolute right-0 top-10 mt-2 w-56 bg-gradient-to-r opacity-[90%] from-gray-900 via-gray-800 to-gray-600  bg-opacity-[20%] text-opacity-[80%] backdrop-filter: blur(16px); bg-clip-content text-white border rounded shadow-lg ">
                  {/* <Link to="/" className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><IoHomeOutline size={25} /></span>Home</Link>
                    <Link to={"/Cart"} className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><IoCartOutline size={25} /></span>Cart</Link>
                    <Link to={"/Wishlist"} className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><CiHeart size={25} /></span>Wishlist</Link> */}
                  <Link to="/contact" className="block w-full px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><MdContactSupport size={25} /></span>Contact Us</Link>
                  <Link to="/about" className="block w-full px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><FcAbout size={25} /></span>About Us</Link>
                  <Link to="/login" className="block w-full px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><MdOutlineLogin size={25} /></span>Login</Link>
                  <Link to="/signup" className="block w-full px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"> <span><FaUserPlus size={25} /></span>Sign Up</Link>
                  <button onClick={handleLogout} className="block px-4 w-full py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded"><span><BiLogOut size={25} /></span>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

      </nav>

      <div className="line mt-6 h-px bg-gray-600"></div>
    </>
  );
};

export default Navbar;

