import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Cart = ({ user }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // console.log("the user is",user,user.email)
                const userEmail =JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`http://localhost:3000/api/getCart/${userEmail}`);
                setCartItems(response.data);
            } catch (err) {
                // setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, []);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
                if (!userEmail) throw new Error('User email not found'); // Replace with actual email logic or context
                const response = await axios.get(`http://localhost:3000/api/getAllProductsCartData/${userEmail}`);
                setCartItems(response.data);
            } catch (err) {
                // setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, []);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`http://localhost:3000/api/getThisMonthBestProductsCartData/${userEmail}`);
                setCartItems(response.data);
            } catch (err) {
                // setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, []);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`http://localhost:3000/api/getWomenFashionProductsDetails/${userEmail}`);
                setCartItems(response.data);
            } catch (err) {
                // setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, []);

    const handleQuantityChange = (productId, change) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.productId === productId
                    ? { ...item, quantity: Math.max((item.quantity || 1) + change, 1) }
                    : item
            )
        );
    };

    const handleDelete = async (productId) => {
        try {
            const userEmail = user.email;
            await axios.delete(`http://localhost:3000/api/deleteFlashCartItem/${userEmail}/${productId}`);
            setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClearCart = async () => {
        try {
            const userEmail = user.email;
            await axios.delete(`http://localhost:3000/api/clearCart/${userEmail}`);
            setCartItems([]); // Clear the cart in the frontend
        } catch (err) {
            // setError(err.message);
        }
    };

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



    if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    const calculateSubtotal = (price, quantity) => price * quantity;

    const subtotal = cartItems.reduce((acc, item) => acc + calculateSubtotal(item.offerPrice, item.quantity || 1), 0);
    return (
        <>

            <div className='main overflow-auto scrollbar-hidden'>
                <div className="direction m-14 ml-32">
                    Home / <span className='font-medium'>Cart</span>
                </div>
                {cartItems.length == 0 ? (
                    <div className="empty-cart text-center my-14">
                        <p className="text-lg font-semibold">No items are added to the cart</p>
                    </div>
                ) : (
                    <div className="Cart flex flex-col gap-5 max-h-[40vh] overflow-auto scrollbar-hidden">
                        <div className="Tiles font-bold bg-white flex justify-between items-center rounded-md border py-4 px-7 ml-32 mr-32">
                            <span className='w-1/4 text-left'>Products</span>
                            <span className='w-1/4 text-center'>Price</span>
                            <span className='w-1/4 text-center'>Quantity</span>
                            <span className='w-1/4 text-right'>Subtotal</span>
                        </div>

                        {cartItems.map((item) => (
                            <div key={item.productId} className="Products bg-white flex items-center rounded-md border py-4 px-7 ml-32 mr-32 font-medium">
                                <span className='w-1/4 flex items-center gap-3'>
                                    <img width={30} src={item.image} alt={item.name} />
                                    <div className="title overflow-auto">{item.name}</div>
                                </span>
                                <span className='w-1/4 flex items-center justify-center'>
                                    <FaIndianRupeeSign />
                                    {numberWithCommas(item.offerPrice)}
                                </span>
                                <span className='w-1/4 flex items-center justify-center'>
                                    <div className="container border rounded-md border-gray-600 w-14 justify-center  h-9 flex items-center">

                                        {item.quantity || 1}
                                        <div className='flex flex-col items-center'>
                                            <button onClick={() => handleQuantityChange(item.productId, 1)} className='flex justify-center items-center px-2'>
                                                <MdOutlineKeyboardArrowUp />
                                            </button>
                                            <button onClick={() => handleQuantityChange(item.productId, -1)} className='flex justify-center items-center px-2'>
                                                <MdOutlineKeyboardArrowDown />
                                            </button>

                                        </div>

                                    </div>
                                </span>
                                <span className='w-1/4 flex gap-1 items-center justify-end'>
                                    <FaIndianRupeeSign />
                                    {numberWithCommas(calculateSubtotal(item.offerPrice, item.quantity || 1))}
                                    <button onClick={() => handleDelete(item.productId)} className="text-red-600">
                                        <FaTrash />
                                    </button>
                                </span>
                            </div>
                        ))}

                    </div>
                )}

                <div className="btns flex justify-between pl-32 pr-32 pt-5">
                    <div className="ReturnShopBtn">
                        <button className='font-medium p-3 pr-8 pl-8 border rounded-md hover:bg-[#DB4444] hover:text-white'>Return To Shop</button>
                    </div>
                    <div className="UpdateCartbtn">
                        <button className='font-medium p-3 pr-8 pl-8 border rounded-md hover:bg-[#DB4444] hover:text-white' onClick={handleClearCart}>Clear All </button>
                    </div>
                </div>
                <div className="cartbottomsec ml-32 pt-16 flex justify-between gap-20 pb-20">
                    <div className="Cupponcodes flex gap-3 items-center">
                        <input className='text-gray-600 border border-gray-700 p-3 w-[17vw] rounded-sm' type="text" placeholder='Coupon Code' />
                        <button className='p-3 pr-8 pl-8 border bg-[#DB4444] text-white rounded-sm'>Apply Coupon</button>
                    </div>

                    <div className="CartTotal container border border-gray-700 w-[22vw] h-[35vh] mr-32 flex flex-col pl-5 pr-5 gap-3">
                        <div className='font-medium text-xl pt-5'>Cart Total</div>

                        <div className="subtotal flex justify-between">
                            <div className='font-medium'>Sub Total</div>
                            <div className='font-medium'>
                                {numberWithCommas(subtotal)}
                            </div>
                        </div>
                        <div className="line h-px bg-gray-600"></div>

                        <div className="subtotal flex justify-between">
                            <div className='font-medium'>Shipping</div>
                            <div className='font-medium'>Free</div>
                        </div>
                        <div className="line h-px bg-gray-600"></div>

                        <div className="subtotal flex justify-between">
                            <div className='font-medium'>Total</div>
                            <div className='font-medium'>
                                {numberWithCommas(subtotal)}
                            </div>
                        </div>

                        <div className="btn flex justify-center items-center">
                            <button className='p-3 pr-8 pl-8 border bg-[#DB4444] text-white rounded-sm'>Proceed To Checkout</button>
                        </div>
                    </div>
                </div>



            </div>


        </>
    );
};

export default Cart;
