import { useState, useEffect } from "react";
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

export default function Bottom_nav() {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])
    return (
        // <div className="fixed bottom-0 left-0 right-0 bg-gray-800 ">
        <nav
            className={`fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-200 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className="xl:flex-row flex xl:hidden  justify-around">
                <Link to="/" className="px-4 py-2 text-white flex items-center gap-3 hover:bg-gray-700 hover:rounded-md"> <span><IoHomeOutline size={25} /></span></Link>
                <Link to="/Profile" className=" px-4 py-2 text-white flex items-center gap-3 hover:bg-gray-700 hover:rounded-md"> <span><CgProfile size={25} /></span></Link>
                <Link to={"/Cart"} className=" px-4 py-2 text-white flex items-center gap-3 hover:bg-gray-700 hover:rounded-md"> <span><IoCartOutline size={25} /></span></Link>
                <Link to={"/Wishlist"} className="px-4 py-2 text-white flex items-center gap-3 hover:bg-gray-700 hover:rounded-md"> <span><CiHeart size={25} /></span></Link>
            </div>
            {/* </div> */}
        </nav>
    )
}