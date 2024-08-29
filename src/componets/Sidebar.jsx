import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar pl-[145px] flex ">
                <ul className='flex flex-col font-medium mt-8'>

                    <Link to={"/WomenFashionProducts"} className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Woman's Fashion
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </Link>

                    <Link to={"/MensFashionProducts"} className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Man's Fashion
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </Link>

                    <li className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Electronics
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Home & Lifestyle
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Medicine
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Sports & Outdoor
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Baby's & Toys
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Groceries & Pets
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>

                    <li className="flex items-center gap-12 group cursor-pointer hover:bg-gray-200 p-2 w-fit rounded-md">
                        Health & Beauty
                        <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            <FaAngleRight />
                        </span>
                    </li>
                </ul>
                <div className="line  w-px bg-gray-600"></div>

            </div>
        </>
    )
}

export default Sidebar
