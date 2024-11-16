import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useFetchers } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { DollarSignIcon, ShoppingCartIcon, UsersIcon, PackageIcon } from 'lucide-react'
import { IoStatsChartSharp } from "react-icons/io5";
import { useEffect } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [Users, setUsers] = useState([]);
    const [Orders, setOrders] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [revenueData, setRevenueData] = useState([]);
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
                setProducts(response.data);

            } catch (error) {
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const FetchUsers = async () => {
            try {
                const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getAllUsers`);
                setUsers(responce.data)
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        FetchUsers();
    }, [])

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


    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/salesData`);
                setSalesData(response.data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    useEffect(() => {
        const fetchTotalRevenue = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/totalRevenue`);
                setTotalRevenue(response.data.totalRevenue);
            } catch (error) {
                console.error('Error fetching total revenue:', error);
            }
        };
        fetchTotalRevenue();
    }, []);

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/monthlyRevenue`);
                const formattedData = response.data.map((item) => ({
                    month: months[item._id - 1], // Convert month number to month name
                    revenue: item.totalRevenue
                }));
                setRevenueData(formattedData);
            } catch (error) {
                console.error('Error fetching monthly revenue:', error);
            }
        };

        fetchMonthlyRevenue();
    }, []);

    function numberWithCommas(num) {
        // Convert number to string and handle decimal places
        let [integerPart, decimalPart] = num.toString().split('.');

        // Handle the integer part
        let formattedIntegerPart = '';
        let length = integerPart.length;

        if (length > 3) {
            // Add the last 3 digits (thousands) first
            formattedIntegerPart = integerPart.slice(-3);

            // Add commas for the rest of the integer part
            integerPart = integerPart.slice(0, -3);
            while (integerPart.length > 2) {
                formattedIntegerPart = integerPart.slice(-2) + ',' + formattedIntegerPart;
                integerPart = integerPart.slice(0, -2);
            }

            // Add any remaining digits
            formattedIntegerPart = integerPart + ',' + formattedIntegerPart;
        } else {
            formattedIntegerPart = integerPart;
        }

        // Reconstruct the final formatted number
        return decimalPart ? formattedIntegerPart + '.' + decimalPart : formattedIntegerPart;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-purple-600 pb-2">Dashboard</h2>

            {/* Summary divs */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-4 shadow-md">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="xl:text-xl text-sm font-medium">Total Revenue</div>
                        <FaIndianRupeeSign className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold flex items-center"><span><FaIndianRupeeSign /></span><span>{numberWithCommas(totalRevenue)}</span></div>
                        <p className="text-xs text-gray-500">+20.1% from last month</p>
                    </div>
                </div>
                <div className="bg-white p-4 shadow-md">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="xl:text-xl text-sm font-medium">Orders</div>
                        <ShoppingCartIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{Orders.length}</div>
                        <p className="text-xs text-gray-500">+180.1% from last month</p>
                    </div>
                </div>

                <div className="bg-white p-4 shadow-md">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="xl:text-xl text-sm font-medium">Products</div>
                        <PackageIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">+{products.length}</div>
                        <p className="text-xs text-gray-500">+49 new products</p>
                    </div>
                </div>

                <div className="bg-white p-4 shadow-md">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="xl:text-xl text-sm font-medium">Active Users</div>
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{Users.length}</div>
                        <p className="text-xs text-gray-500">+201 since last hour</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-4 shadow-md">
                    <div className="text-lg font-bold mb-4">Sales by Category</div>
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-4 shadow-md">
                    <div className="text-lg font-bold mb-4">Revenue Over Time</div>
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function EcommerceAdminDashboard() {
    return (
        <div className="flex h-screen bg-gray-100 fixed w-full">
            {/* Sidebar */}
            <div className="xl:w-64 w-52 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="xl:text-3xl text-xl font-bold text-purple-600 pt-2">E-com Admin</h1>
                </div>
                <nav className="mt-4 flex flex-col gap-3 px-1">
                    <Link to="/admin-dashboard">
                        <button className="w-full hover:bg-black py-2 hover:text-white flex justify-start px-5  items-center">
                            <IoStatsChartSharp className="mr-2 h-4 w-4" />
                            <span className='xl:text-xl text-sm font-medium'>Dashboard</span>
                        </button>
                    </Link>
                    <Link to="/orders">
                        <button className="w-full hover:bg-black py-2 hover:text-white flex justify-start px-5  items-center">
                            <ShoppingCartIcon className="mr-2 h-4 w-4" />
                            <span className='xl:text-xl text-sm font-medium'>Orders</span>
                        </button>
                    </Link>

                    <Link to="/Add-Products">
                        <button className="w-full hover:bg-black py-2 hover:text-white flex justify-start px-5  items-center">
                            <ShoppingCartIcon className="mr-2 h-4 w-4" />
                            <span className='xl:text-xl text-sm font-medium'>Products</span>
                        </button>
                    </Link>

                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-8 overflow-auto">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    )
}
