import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useFetchers } from 'react-router-dom'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { DollarSignIcon, ShoppingCartIcon, UsersIcon, PackageIcon } from 'lucide-react'
import { IoStatsChartSharp } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

// Product detail popup component
function ProductDetailPopup({ order, onClose, onUpdateStatus }) {
    const [status, setStatus] = useState(order.status);
    const popupRef = useRef(null);

    // Close the popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    // Handle status change
    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        try {
            // Update status in the backend
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${order._id}/status`, { status: newStatus });
            onUpdateStatus(order._id, response.data.status); // Update status in the parent component
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 mt-12">
        <div ref={popupRef} className="bg-white p-8 shadow-2xl rounded-xl xl:w-[37vw] w-[90vw] max-h-[90vh] relative">
            {/* <!-- Close Button --> */}
            <button
                className="absolute text-2xl top-5 right-3 text-gray-500 hover:text-red-500 transition-all"
                onClick={onClose}
            >
                ✖
            </button>
    
            {/* <!-- Header --> */}
            <h2 className="text-lg xl:text-2xl font-extrabold mb-4 border-b pb-2 text-gray-800">
                Order Details
            </h2>
    
            {/* <!-- Order Information --> */}
            <div className="space-y-2 text-gray-700">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Customer Name:</strong> {order.customerDetails.name}</p>
                <p><strong>Address:</strong> {order.customerDetails.address}</p>
                <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString('en-CA')}</p>
                <p className="flex items-center">
                    <strong>Total Amount:</strong>
                    <span className="ml-2 flex items-center font-semibold text-lg text-green-600">
                        <FaIndianRupeeSign className="mr-1" />{order.amount}
                    </span>
                </p>
                <p>
                    <strong>Status:</strong>
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="ml-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option className="text-yellow-500" value="Pending">Pending</option>
                        <option className="text-orange-500" value="Processing">Processing</option>
                        <option className="text-blue-500" value="Shipped">Shipped</option>
                        <option className="text-green-500" value="Delivered">Delivered</option>
                    </select>
                </p>
            </div>
    
            {/* <!-- Products Section --> */}
            <h3 className="mt-6 text-lg font-semibold text-gray-800 border-t pt-2 ">Products:</h3>
            <ul className="list-none scrollbar-hidden space-y-2 max-h-[20vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pr-2">
                {order.products.map((product, index) => (
                    <li
                        className="flex items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
                        key={index}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-md border border-gray-300"
                        />
                        <span className="w-1/2 font-medium text-gray-700">{product.name}</span>
                        <span className="w-1/6 text-gray-600 text-sm">(Q: {product.quantity})</span>
                        <span className="flex items-center w-1/4 font-semibold text-green-600">
                            <FaIndianRupeeSign className="mr-1" />{product.price}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    
    );
}


function Orders() {
    const [Orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
    const [isadmin, setIsAdmin] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]); // State for filtered orders
    const [selectedFilter, setSelectedFilter] = useState(''); // State for active filter

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

    useEffect(() => {
        const FetchOrders = async () => {
            try {
                const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getOrdersForAdmin`);
                setOrders(responce.data)
                setFilteredOrders(responce.data);// Initially, show all orders
                // console.log("Order data:",responce.data)
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        FetchOrders();
    }, [])

    const handleFilterClick = (status) => {
        setSelectedFilter(status);
        if (status === '') {
            setFilteredOrders(Orders); // Show all orders when no filter is selected
        } else {
            setFilteredOrders(Orders.filter(order => order.status === status));
        }
    };

    // Handler to open the product detail popup
    const handleRowClick = (order) => {
        setSelectedOrder(order); // Set the selected order for the popup
    };

    // Handler to close the product detail popup
    const closePopup = () => {
        setSelectedOrder(null); // Deselect the order to close the popup
    };

    // Handler to update the status of the order
    const handleUpdateStatus = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );

    };


    const getStatusClass = (status) => {
        switch (status) {
            case 'Delivered':
                return 'text-green-500'; // Green for delivered
            case 'Pending':
                return 'text-yellow-500'; // Yellow for pending
            case 'Processing':
                return 'text-orange-500'; // Orange for processing
            case 'Shipped':
                return 'text-blue-500'; // Blue for shipped
            default:
                return 'text-gray-500'; // Default gray
        }
    };

    return (
        <div className="">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Orders</h2>
            <div className="flex gap-4 mb-4">
                {['', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status, index) => (
                    <button
                        key={index}
                        onClick={() => handleFilterClick(status)}
                        className={`px-4 py-2 rounded-md shadow-md ${selectedFilter === status ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'
                            }`}
                    >
                        {status === '' ? 'All' : status}
                    </button>
                ))}
            </div>
            <div className="bg-white pt-4 shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto max-h-[90vh] overflow-auto scrollbar-hidden">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Order ID</th>
                                <th className="px-4 py-2 text-left">Customer</th>
                                <th className='px-4 py-2 text-left'>Address</th>
                                <th className="px-4 py-2 text-left">Total</th>
                                <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (
                                <tr
                                    key={order.orderId}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleRowClick(order)} // Open the popup on click
                                >
                                    <td className="border px-4 py-2">{order.orderId}</td>
                                    <td className="border px-4 py-2">{order.customerDetails.name}</td>
                                    <td className="border px-4 py-2">{order.customerDetails.address}</td>
                                    <td className="border px-4 py-2">{order.amount}</td>
                                    <td className={`border px-4 py-2 ${getStatusClass(order.status)}`}>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Show the popup if an order is selected */}
            {selectedOrder && (
                <ProductDetailPopup
                    order={selectedOrder}
                    onClose={closePopup}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
}

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
                    <Route path="/" element={<Orders />} />
                </Routes>
            </div>
        </div>
        </>
    )
}

