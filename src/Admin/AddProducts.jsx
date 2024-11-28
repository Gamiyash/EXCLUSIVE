import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useFetchers } from 'react-router-dom'
import { ShoppingCartIcon } from 'lucide-react'
import { IoStatsChartSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function AddProducts() {
    const [Products, setProducts] = useState({
        name: '',
        image: '',
        sideimg1: '',
        sideimg2: '',
        sideimg3: '',
        sideimg4: '',
        offerPrice: '',
        actualPrice: '',
        discount: '',
        rating: '',
        type: '',
        keyword: '',
        discription: '',
        size: ''
    });
    const [selectedCategory, setSelectedCategory] = useState("")

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
    const navigate = useNavigate();
    if (isadmin == false) {
        navigate('/')
    }

    const handleProductsChange = (e) => {
        const { name, value } = e.target;

        setProducts((prevProducts) => ({
            ...prevProducts,
            [name]: (name === 'offerPrice' || name === 'actualPrice' || name === 'rating') ? parseFloat(value) : value,
        }));
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;

        setProducts((prevProducts) => ({
            ...prevProducts,
            [name]: value.split(',').map(item => item.trim()) // Convert comma-separated input to array
        }));
    };

    const Add_Products = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add-products`, {
                ...Products
            })
            alert(`Product Saved Succesfully in:${selectedCategory}`);
            console.log(Products)
        } catch (error) {
            console.log(`Error to save Products in:${selectedCategory}`, error)
            alert('Failed to save Products details');
        }
    };

    const AddFlashProducts = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add-Flash_products`, {
                ...Products
            })
            alert(`Product Saved Succesfully in:${selectedCategory}`);
            console.log(Products)
        } catch (error) {
            console.log("Error to save Products:", error)
            alert('Failed to save Products details');
        }
    };

    const AddThisMonthBestProducts = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add-ThisMonthBest_products`, {
                ...Products
            })
            alert(`Product Saved Succesfully in:${selectedCategory}`);
            console.log(Products)
        } catch (error) {
            console.log(`Error to save Products in:${selectedCategory}`, error)
            alert('Failed to save Products details');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let ExacuteFunction = null;

        switch (selectedCategory) {
            case "Products":
                ExacuteFunction = Add_Products;
                break;
            case "FlashProducts":
                ExacuteFunction = AddFlashProducts;
                break;
            case "ThisMonthBestProducts":
                ExacuteFunction = AddThisMonthBestProducts;
                break;
            default:
                ExacuteFunction = Add_Products;
                break;
        }

        if (ExacuteFunction) {
            await ExacuteFunction(e);
        }
    };
    return (
        <div className='flex justify-center items-center w-full mb-10 pb-10'>

            <div className="details flex flex-col gap-3 border border-gray-400 rounded-md xl:w-[80%] w-full p-5 bg-white shadow-md ">

                <div className='flex flex-col gap-1 pb-5'>
                    <h1 className='text-3xl font-bold'>Add New Product</h1>
                    <p className='text-gray-400 xl:text-xl text-sm'>Enter the details of the new product below.</p>
                </div>
                {/* Category selection */}
                <div className='flex flex-col gap-1 xl:text-xl text-sm'>
                    <label className='text-black font-medium text-sm'>Select Product Type</label>
                    <select className='border rounded-md p-3' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="Products">Add To ALL Products</option>
                        <option value="FlashProducts">Flash Products</option>
                        <option value="ThisMonthBestProducts">This Month's Best Products</option>
                    </select>
                </div>


                <div className='flex flex-col gap-1 xl:text-xl text-sm'>
                    <label className='text-black font-medium text-sm' htmlFor="name">Enter Product Name</label>
                    <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="name" value={Products.name} onChange={handleProductsChange} />
                </div>

                <div className='flex justify-center items-center gap-2 w-full'>
                    <div className='flex flex-col gap-1 xl:text-xl text-sm w-1/2'>
                        <label className='text-black font-medium text-sm' htmlFor="offerPrice">Offer Price</label>
                        <input className='border border-gray-400 h-10 rounded-md px-3' type="number" name="offerPrice" value={Products.offerPrice} onChange={handleProductsChange} />
                    </div>

                    <div className='flex flex-col gap-1 xl:text-xl text-sm w-1/2'>
                        <label className='text-black font-medium text-sm' htmlFor="actualPrice">Actual Price</label>
                        <input className='border border-gray-400 h-10 rounded-md px-3' type="number" name="actualPrice" value={Products.actualPrice} onChange={handleProductsChange} />
                    </div>
                </div>

                <div className='flex justify-center gap-2 items-center w-full'>
                    <div className='flex flex-col gap-1 xl:text-xl text-sm w-1/2'>
                        <label className='text-black font-medium text-sm' htmlFor="image">discount</label>
                        <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="discount" value={Products.discount} onChange={handleProductsChange} />
                    </div>

                    <div className='flex flex-col gap-1 xl:text-xl text-sm w-1/2'>
                        <label className='text-black font-medium text-sm' htmlFor="rating">Rating</label>
                        <input className='border border-gray-400 h-10 rounded-md px-3' type="number" name="rating" value={Products.rating} onChange={handleProductsChange} />
                    </div>
                </div>

                <div className='flex flex-col gap-1 xl:text-xl text-sm'>
                    <label className='text-black font-medium text-sm' htmlFor="image">Main Image URL</label>
                    <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="image" value={Products.image} onChange={handleProductsChange} />
                </div>
                <div className='flex justify-center items-center gap-2 w-full'>
                    <div className='flex flex-col gap-1 xl:text-xl text-sm w-1/2'>
                        <label className='text-black font-medium text-sm' htmlFor="image">Side Image 1 URL</label>
                        <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="sideimg1" value={Products.sideimg1} onChange={handleProductsChange} />
                    </div>

                    <div className='flex flex-col gap-1 xl:text-xl text-sm w-1/2'>
                        <label className='text-black font-medium text-sm' htmlFor="image">Side Image 2 URL</label>
                        <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="sideimg2" value={Products.sideimg2} onChange={handleProductsChange} />
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2 w-full'>
                    <div className='flex flex-col gap-1 xl:text-xl text-sm w-1/2'>
                        <label className='text-black font-medium text-sm' htmlFor="image">Side Image 3 URL</label>
                        <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="sideimg3" value={Products.sideimg3} onChange={handleProductsChange} />
                    </div>

                    <div className='flex flex-col gap-1 xl:text-xl text-sm w-1/2'>
                        <label className='text-black font-medium text-sm' htmlFor="image">Side Image 4 URL</label>
                        <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="sideimg4" value={Products.sideimg4} onChange={handleProductsChange} />
                    </div>
                </div>

                <div className='flex flex-col gap-1 xl:text-xl text-sm'>
                    <label className='text-black font-medium text-sm' htmlFor="image">Product Category ex(watch,Mobile,WomenFashion,Mens,Shoes..)</label>
                    <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="type" value={Products.type} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 xl:text-xl text-sm'>
                    <label className='text-black font-medium text-sm' htmlFor="keyword">Keywords (comma separated) for batter search results</label>
                    <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="keyword" value={Products.keyword} onChange={handleArrayChange} />
                </div>

                <div className='flex flex-col gap-1 xl:text-xl text-sm'>
                    <label className='text-black font-medium text-sm' htmlFor="size">Size (comma separated) ex(small,medium...)</label>
                    <input className='border border-gray-400 h-10 rounded-md px-3' type="text" name="size" value={Products.size} onChange={handleArrayChange} />
                </div>

                <div className='flex flex-col gap-1 xl:text-xl text-sm'>
                    <label className='text-black font-medium text-sm' htmlFor="image">Discription</label>
                    <input className='border border-gray-400 h-20 rounded-md px-3' type="text" name="discription" value={Products.discription} onChange={handleProductsChange} />
                </div>
                <button className='flex justify-center items-center bg-black text-white py-3 rounded-md font-medium cursor-pointer' onClick={handleSubmit}>Save Product</button>
            </div>
        </div>
    );
};

export default function EcommerceAdminDashboard() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Variables to track touch positions
    let touchStartX = 0;
    let touchEndX = 0;

    // Handle touch start
    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    // Handle touch move
    const handleTouchMove = (e) => {
        touchEndX = e.touches[0].clientX;
    };

    // Handle touch end to determine swipe direction
    const handleTouchEnd = () => {
        if (touchEndX - touchStartX > 50) {
            // Swipe right detected
            setIsSidebarOpen(true);
        } else if (touchStartX - touchEndX > 50) {
            // Swipe left detected
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        // Attach touch event listeners
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);
    return (
        <>
           <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed xl:relative xl:w-64 w-52 bg-white shadow-md transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } xl:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                <div className="p-4">
                    <h1 className="xl:text-3xl text-xl font-bold text-purple-600 pt-2">E-com Admin</h1>
                </div>
                <nav className="mt-4 flex flex-col gap-3 px-1 h-[100vh]">
                    <Link to="/admin-dashboard">
                        <button className="w-full hover:bg-black py-2 hover:text-white flex justify-start px-5 items-center">
                            <IoStatsChartSharp className="mr-2 h-4 w-4" />
                            <span className="xl:text-xl text-sm font-medium">Dashboard</span>
                        </button>
                    </Link>
                    <Link to="/orders">
                        <button className="w-full hover:bg-black py-2 hover:text-white flex justify-start px-5 items-center">
                            <ShoppingCartIcon className="mr-2 h-4 w-4" />
                            <span className="xl:text-xl text-sm font-medium">Orders</span>
                        </button>
                    </Link>
                    <Link to="/Add-Products">
                        <button className="w-full hover:bg-black py-2 hover:text-white flex justify-start px-5 items-center">
                            <ShoppingCartIcon className="mr-2 h-4 w-4" />
                            <span className="xl:text-xl text-sm font-medium">Products</span>
                        </button>
                    </Link>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-8 overflow-auto">
                <Routes>
                    <Route path="/" element={<AddProducts />} />
                </Routes>
            </div>
        </div>
        </>
    )
}
