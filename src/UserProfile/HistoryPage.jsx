import React from 'react'
import { useState, useEffect } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate,useParams } from 'react-router';


const HistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
    const navigate = useNavigate();
    const {orderId} = useParams();


    useEffect(() => {
        // Fetch order history when the component loads
        const fetchOrders = async () => {

            try {
                const response = await axios.get(`http://localhost:3000/api/getOrders/${userEmail}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userEmail]);

    const handleOrderclick = (orderId) => {
        navigate(`/orderHistoryDetails/${orderId}`);
    }


    return (
        <>
            <main className='flex flex-col justify-center items-center gap-9 mt-10'>
                <div className='flex flex-col border border-gray-300 rounded-b-xl'>
                    <h1 className='px-10 py-7 text-4xl font-bold bg-black text-white w-[80vw] flex gap-2 items-center'>
                        <span><IoCartOutline /></span>
                        <span>Order History</span></h1>
                    <p className='px-10 py-7 text-xl'>View and manage your past orders</p>
                </div>

                <div className="Containers flex flex-col justify-center items-center gap-5 mb-10">
                    {orders.length > 0 ? orders.map((order) => (
                        <div key={order.orderId} className='Container flex justify-between items-center container w-[80vw] h-[27vh] border rounded-xl border-gray-300 p-10 transition-transform hover:shadow-xl'
                            onClick={() => handleOrderclick(order.orderId)}>
                            <section className='sec-1 flex justify-center items-center gap-8'>
                                <div className="img  rounded-sm bg-gray-200">
                                    <img className='w-32 h-32' src={order.products[0]?.image} alt={order.products[0]?.name} />
                                </div>

                                <div className="orderDetails flex flex-col gap-3">

                                    <div className="Group1 flex flex-col items-start">
                                        <div className="orderId text-2xl font-bold">
                                            <span>Order #{order.orderId}</span>
                                        </div>

                                        <div className="Date flex items-center gap-1 text-gray-500 text-[20px]">
                                            <span>< FaRegCalendarAlt /></span><span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="Group2 flex flex-col items-start">
                                        <div className="totalItems flex items-center gap-1 text-gray-500 text-[20px]">
                                            <span><LuPackage /></span><span>{order.products.length} items</span>
                                        </div>

                                        <div className="totalPrice flex items-center text-2xl font-bold text-green-500">
                                            <span><FaIndianRupeeSign /></span><span>{order.amount}</span>
                                        </div>
                                    </div>

                                </div>
                            </section>
                            <section className='sec-2'>

                                <div className="orderStatus flex flex-col justify-end items-end gap-16">
                                    <div className={`Status text-xl text-white font-medium border rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}  px-4 py-2`}>
                                        <span>{order.status}</span>
                                    </div>

                                    <div className="btn flex items-center gap-3">

                                        <div className='border border-gray-400 py-2 px-3 rounded-md text-xl font-medium'>
                                            <button>View Details</button>
                                        </div>

                                        <div className='border border-gray-400 py-2 px-3 rounded-md text-xl font-medium'>
                                            <button>View Details</button>
                                        </div>

                                    </div>
                                </div>

                            </section>

                        </div>
                    )) : (
                        <p className='text-xl text-gray-500'>No orders found</p>
                    )}
                </div>
            </main >
        </>
    )
};

export default HistoryPage
