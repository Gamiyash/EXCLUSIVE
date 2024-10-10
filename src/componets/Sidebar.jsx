import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {

    return (
        <>
            <div className="sidebar xl:pl-[5%] xl:flex">
                <ul className='flex xl:flex-col font-medium xl:mt-3  '>

                    <Link to={"/WomenFashionProducts"} className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Woman's Fashion
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </Link>

                    <Link to={"/MensFashionProducts"} className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Man's Fashion
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </Link>

                    <Link to={"/Electronics"} className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Electronics
                        <span className="opacity-0 text-sm  transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </Link>

                    <li className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Home & Lifestyle
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Medicine
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Sports & Outdoor
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Baby's & Toys
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Groceries & Pets
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="block xl:text-sm md:text-[10px] text-[5px] xl:px-4 xl:py-2 text-[#FFFFFF flex items-center gap-3 xl:hover:bg-gray-200 hover:bg-gray-700 hover:rounded">
                        Health & Beauty
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>
                </ul>
                <div className="line lg:block hidden w-px bg-gray-600"></div>

            </div>

            {/* {dropdownVisible && ( */}
            {/* <div className="sidebar flex absolute left-10 top-16 mt-2 w-56 bg-gradient-to-r opacity-[90%] from-gray-900 via-gray-800 to-gray-600  bg-opacity-[20%] text-opacity-[80%] backdrop-filter: blur(16px); bg-clip-content text-white border rounded shadow-lg ">
                    <ul className='flex flex-col font-medium mt-8'>

                        <Link to={"/WomenFashionProducts"} className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Woman's Fashion
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </Link>

                        <Link to={"/MensFashionProducts"} className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Man's Fashion
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </Link>

                        <Link to={"/Electronics"} className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Electronics
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </Link>

                        <li className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Home & Lifestyle
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </li>

                        <li className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Medicine
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </li>

                        <li className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Sports & Outdoor
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </li>

                        <li className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Baby's & Toys
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </li>

                        <li className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Groceries & Pets
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </li>

                        <li className="block px-4 py-2 text-[#FFFFFF flex items-center gap-3 hover:bg-gray-700 hover:rounded">
                            Health & Beauty
                            <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <FaAngleRight />
                            </span>
                        </li>
                    </ul>
                    <div className="line w-px bg-gray-600"></div>

                </div> */}
            {/* )} */}
        </>
    )
}

export default Sidebar
