import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { LiaTruckSolid } from "react-icons/lia";
import { LuPackage } from "react-icons/lu";
import { useNavigate, useParams } from 'react-router';
import { FaIndianRupeeSign } from "react-icons/fa6";


const OrderHistoryDetails = () => {
    const [orders, setOrders] = useState([]);
    const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
    const { orderId } = useParams(); // Get the orderId from the URL
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const responce = await axios.get(`http://localhost:3000/api/getOrders/${userEmail}/${orderId}`)
                setOrders(responce.data);
                // console.log("orders",responce.data)
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchOrders();

    }, [orderId, userEmail])
    console.log("order", orders.products)

    const handleBack = () => {
        navigate('/orderHistory'); // Go back to the previous page (order history)
    };

    return (
        <>
            <div className='heading flex gap-10 m-10'>
                <div className="backBtn flex justify-center items-center gap-3 text-lg font-medium cursor-pointer" onClick={handleBack}>
                    <span><FaArrowLeft /></span><span className=' hidden xl:block'>Back to Orders</span>
                </div>

                <div className="orderId text-2xl xl:text-4xl font-bold">
                    <span>Order: #{orderId}</span>
                </div>
            </div>

            {orders.map((order) => (
                <main key={orderId} className='flex flex-col xl:flex-row'>
                    <section className='sec-1 border border-gray-300 rounded-md p-8 xl:ml-8 xl:my-8 w-[100vw] xl:w-[70vw]'>

                        <div className="title flex flex-col gap-14">
                            <span className='text-4xl font-medium'>Order Summary</span>
                            <div className="orderDetails flex justify-between gap-1">
                                <div className="date flex flex-col">
                                    <span className='text-gray-500 text-lg'>Order Date</span>
                                    <span className='font-medium text-xl'>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>

                                <div className="orderStatus flex flex-col gap-1">
                                    <span className='text-gray-500 text-lg'>Order Status</span>
                                    <span className='text-white flex justify-center items-center font-medium border rounded-full px-3 py-1 bg-green-500'>{order.status}</span>
                                </div>

                                <div className="TotalAmount flex flex-col gap-1">
                                    <span className='text-gray-500 text-lg'>Total Amount</span>
                                    <span className='font-medium text-2xl flex justify-center items-center'><span><FaIndianRupeeSign /></span><span>{order.amount}</span></span>
                                </div>
                            </div>
                        </div>


                        <div className="line mt-8 mb-8 h-[2px] bg-gray-300"></div>

                        <div className="Items-sec flex flex-col gap-10">
                            <div className="title text-2xl font-medium">Items in Your Order</div>

                            <div className="Products flex flex-col gap-4 max-h-[60vh] overflow-auto scrollbar-hidden">
                                {orders[0].products.map((product, index) => (
                                    <div key={index} className="Product flex flex-col ">
                                        <div className='flex justify-between items-center'>
                                            <div className="group1 flex items-center justify-center gap-4">
                                                <div className="img w-24 h-24 bg-gray-200">
                                                    <img src={product.image} alt="" />
                                                </div>

                                                <div className="ProductDetails flex flex-col gap-2">
                                                    <div className="name text-2xl font-medium max-w-[30vw]">
                                                        {product.name}
                                                    </div>
                                                    <div className="Quantity text-gray-400 text-xl">Quantity:{product.quantity}</div>
                                                </div>
                                            </div>
                                            <div className="Amount text-2xl font-bold">{product.price}</div>
                                        </div>
                                        <div className="line my-8 h-[1px] bg-gray-300"></div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </section>

                    <section className='sec-2 flex flex-col gap-8 p-8 w-[100vw] xl:w-[30vw]'>

                        <div className="ShippingInformation p-7 border border-gray-400 rounded-md flex flex-col gap-14">
                            <div className="cardTitle text-3xl font-bold">Shipping Information</div>

                            <div className="ShopingDetails flex flex-col gap-1">
                                <span className="address text-xl font-medium">
                                    Shipping Address:
                                </span>
                                <span className='text-lg'>{order.customerDetails.address}</span>

                                <div className="line my-3 h-[1px] bg-gray-300"></div>

                                <span className="address text-xl font-medium">
                                    Shipping Method:
                                </span>
                                <span className='text-lg'>Standard Shipping</span>
                            </div>
                        </div>


                        <div className="OrderTotal p-7 border border-gray-400 rounded-md flex flex-col gap-14">
                            <div className="cardTitle text-3xl font-bold">Order Total</div>

                            <div className="ShopingDetails flex flex-col gap-3">
                                <div className="group1 flex justify-between items-center">
                                    <span className="address text-xl ">
                                        Subtotal:
                                    </span>
                                    <span className='text-xl font-medium flex justify-center items-center'><span><FaIndianRupeeSign /></span><span>{order.amount}</span></span>
                                </div>


                                <div className="group1 flex justify-between items-center">
                                    <span className="address text-xl ">
                                        Shipping:
                                    </span>
                                    <span className='text-xl font-medium'>Free</span>
                                </div>

                                <div className="line my-1 h-[1px] bg-gray-300"></div>

                                <div className="group1 flex justify-between items-center">
                                    <span className="address text-2xl font-medium">
                                        Total:
                                    </span>
                                    <span className='text-2xl font-medium flex justify-center items-center'><span><FaIndianRupeeSign /></span><span>{order.amount}</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="btns flex flex-col gap-3 ">
                            <button className='text-xl bg-black hover:bg-slate-900 text-white px-7 py-3 flex items-center gap-2 justify-center font-medium rounded-md'><span className='text-2xl'><LiaTruckSolid /></span><span>Track Order</span></button>
                            <button className='text-xl hover:bg-gray-100 px-7 py-3 flex justify-center items-center gap-2 font-medium rounded-md'><span className='text-2xl'>< LuPackage /></span><span>Return or Exchange</span></button>
                        </div>

                    </section>

                </main>
            ))}

        </>
    )
}

export default OrderHistoryDetails




