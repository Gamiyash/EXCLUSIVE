import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useFetchers } from 'react-router-dom'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { DollarSignIcon, ShoppingCartIcon, UsersIcon, PackageIcon } from 'lucide-react'
import { IoStatsChartSharp } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";

// Product detail popup component
function ProductDetailPopup({ order, onClose, onUpdateStatus }) {
    const [status, setStatus] = useState(order.status);

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 shadow-lg w-[35vw] rounded-md relative">
                <button
                    className="absolute text-2xl top-5 right-3 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    X
                </button>
                <h2 className="text-xl font-bold mb-4">Order Details</h2>

                <div className=''>
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Customer Name:</strong> {order.customerDetails.name}</p>
                    <p><strong>Address:</strong> {order.customerDetails.address}</p>
                    <p className='flex items-center'><strong>Total Amount:</strong><span><FaIndianRupeeSign /></span><span>{order.amount}</span></p>
                    <p>
                        <strong>Status:</strong>
                        <select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
                            <option className='text-yellow-500' value="Pending">Pending</option>
                            <option className='text-orange-500' value="Processing">Processing</option>
                            <option className='text-blue-500' value="Shipped">Shipped</option>
                            <option className='text-green-500' value="Delivered">Delivered</option>
                        </select>
                    </p>
                    <h3 className="mt-4 font-semibold">Products:</h3>
                    <ul className="list-disc list-inside space-y-3 max-h-[60vh] overflow-auto scrollbar-hidden">
                        {order.products.map((product, index) => (
                            <li className='flex items-center gap-2 w-[31vw] border border-gray-400 p-3' key={index}>
                                <img width={30} src={product.image} alt="" /> <span className='w-1/2'>{product.name}</span> <span className='w-1/6'>(Q:{product.quantity})</span> - <span className='flex items-center w-1/4'><FaIndianRupeeSign />{product.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


function Orders() {
    const [Orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order

    useEffect(() => {
        const FetchOrders = async () => {
            try {
                const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getOrdersForAdmin`);
                setOrders(responce.data)
                // console.log("Order Length is:",Orders.length)
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        FetchOrders();
    }, [])

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
        <div className="p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Orders</h2>
            <div className="bg-white p-4 shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto max-h-[100vh] overflow-auto scrollbar-hidden">
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
                            {Orders.map(order => (
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

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-md">
                    <div className="p-4">
                        <h1 className="text-3xl font-bold text-purple-600 pt-2">E-com Admin</h1>
                    </div>
                    <nav className="mt-4 flex flex-col gap-3 px-1">
                        <Link to="/admin-dashboard">
                            <button className="w-full hover:bg-black py-2 hover:text-white flex justify-start px-5 items-center">
                                <IoStatsChartSharp className="mr-2 h-4 w-4" />
                                <span className='text-xl font-medium'>Dashboard</span>
                            </button>
                        </Link>
                        <Link to="/orders">
                            <button className="w-full hover:bg-black py-2 hover:text-white flex justify-start px-5  items-center">
                                <ShoppingCartIcon className="mr-2 h-4 w-4" />
                                <span className='text-xl font-medium'>Orders</span>
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

