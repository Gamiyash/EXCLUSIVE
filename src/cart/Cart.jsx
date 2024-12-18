import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Cart = ({ user }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // console.log("the user is",user,user.email)
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCart/${userEmail}`);
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
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getAllProductsCartData/${userEmail}`);
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
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getThisMonthBestProductsCartData/${userEmail}`);
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
            window.location.reload();
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteflashCartItem/${userEmail}/${productId}`);
     
            setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
        } catch (err) {
            // setError(err.message);
        }
    };

    const handleClearCart = async () => {
        try {
            const userEmail = user.email;
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/clearCart/${userEmail}`);
            setCartItems([]); // Clear the cart in the frontend
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateCart = async () => {
        try {
            const userEmail = JSON.parse(localStorage.getItem('user'))?.email;

            const updateRequests = cartItems.map(item => {
                return axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateCart`, {
                    email: userEmail,
                    productId: item.productId,
                    quantity: item.quantity || 1, // Send the updated quantity
                    size: item.size,// Ensure size is a single value
                    offerPrice: item.offerPrice
                });
            });

            // Wait for all update requests to finish
            await Promise.any(updateRequests);

            alert('Cart updated successfully!');
        } catch (error) {
            console.error('Error updating cart:', error.response?.data || error.message);
            alert('Error updating cart!');
        }

        try {
            const userEmail = JSON.parse(localStorage.getItem('user'))?.email;

            const AddDataIntoCheckoutRequests = cartItems.map(item => {
                return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/Checkout`, {
                    email: userEmail,
                    productId: item.productId,
                    quantity: item.quantity || 1, // Send the updated quantity
                    size: item.size,// Ensure size is a single value
                    offerPrice: item.offerPrice
                });
            });

            // Wait for all update requests to finish
            await Promise.any(AddDataIntoCheckoutRequests);

            // alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error.response?.data || error.message);
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

    const RedirectToCheckout = async () => {
        try {
            const userEmail = JSON.parse(localStorage.getItem('user'))?.email;

            const AddDataIntoCheckoutRequests = cartItems.map(item => {
                return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/Checkout`, {
                    email: userEmail,
                    productId: item.productId,
                    quantity: item.quantity || 1, // Send the updated quantity
                    size: item.size,// Ensure size is a single value
                    offerPrice: item.offerPrice
                });
            });

            // Wait for all update requests to finish
            await Promise.any(AddDataIntoCheckoutRequests);

            // alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error.response?.data || error.message);
        }
        navigate("/Checkout")
    }



    if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
    if (error) return <p className='flex justify-center items-center mt-20'>Error: {error}</p>;



    const calculateSubtotal = (price, quantity) => price * quantity;

    const subtotal = cartItems.reduce((acc, item) => acc + calculateSubtotal(item.offerPrice, item.quantity || 1), 0);
    return (
        <>
            <div className='main overflow-auto scrollbar-hidden'>
                <div className="direction my-[2%] ml-[10%]">
                    Home / <span className='font-medium'>Cart</span>
                </div>
                {cartItems.length == 0 ? (
                    <div className="empty-cart text-center my-14">
                        <p className="text-lg font-semibold">No items are added to the cart</p>
                    </div>
                ) : (
                    <div className="Cart flex flex-col gap-5 xl:max-h-[40vh] max-h-[30vh] overflow-auto scrollbar-hidden">
                        <div className="Tiles font-bold bg-white flex justify-between items-center rounded-md border py-4 px-7 xl:mx-32 mx-2">
                            <span className='w-1/4 text-left'>Products</span>
                            <span className='w-1/4 text-center'>Price</span>
                            <span className='w-1/4 text-center'>Quantity</span>
                            <span className='w-1/4 text-right'>Subtotal</span>
                        </div>

                        {cartItems.map((item) => (
                            <div key={item.productId} className="Products bg-white flex items-center rounded-md border py-4 px-7 xl:mx-32 mx-2 font-medium">
                                <span className='w-1/4 flex items-center xl:text-sm text-[8px] gap-3'>
                                    <img width={30} src={item.image} alt={item.name} />
                                    <div className="title overflow-auto">{item.name}</div>
                                </span>
                                <span className='w-1/4 flex items-center justify-center xl:text-sm text-[10px]'>
                                    <FaIndianRupeeSign />
                                    {numberWithCommas(item.offerPrice)}
                                </span>
                                <span className='w-1/4 flex items-center justify-center xl:text-sm text-[10px]'>
                                    <div className="container border rounded-md border-gray-600 xl:w-14 xl:h-9 w-10 h-7 justify-center  flex items-center">

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
                                <span className='w-1/4 flex gap-1 items-center justify-end xl:text-sm text-[10px]'>
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

                <div className="btns flex justify-between xl:px-32 px-2 pt-3">
                    <div className="ReturnShopBtn">
                        <button className='font-medium p-3 pr-8 pl-8 border rounded-md hover:bg-[#DB4444] hover:text-white' onClick={handleUpdateCart}>Update Cart</button>
                    </div>
                    <div className="UpdateCartbtn">
                        <button className='font-medium p-3 pr-8 pl-8 border rounded-md hover:bg-[#DB4444] hover:text-white' onClick={handleClearCart}>Clear All </button>
                    </div>
                </div>
                <div className="cartbottomsec pt-10 xl:flex-row flex flex-col justify-end items-end pr-10 xl:justify-between xl:items-center xl:px-32 xl:gap-20 gap-10 pb-20">
                    <div className="Cupponcodes flex items-center gap-3 w-[50vw]">
                        <input className='text-gray-600 border xl:text-sm text-[10px] border-gray-700 xl:py-3 py-2 xl:w-[17vw] w-full rounded-sm px-2' type="text" placeholder='Coupon Code' />
                        <button className='xl:py-3 xl:px-8 xl:text-sm text-[10px] px-5 py-2 border bg-[#DB4444] text-white rounded-sm text-nowrap'>Apply Coupon</button>
                    </div>

                    <div className="CartTotal border border-gray-700 xl:w-[25vw] w-[50vw] h-full  flex flex-col px-5 gap-2">
                        <div className='font-medium xl:text-xl text-lg pt-5'>Cart Total</div>

                        <div className="subtotal text-sm flex justify-between">
                            <div className='font-medium '>Sub Total</div>
                            <div className='font-medium flex items-center'>
                                <FaIndianRupeeSign />{numberWithCommas(subtotal)}
                            </div>
                        </div>
                        <div className="line h-px bg-gray-600"></div>

                        <div className="subtotal text-sm flex justify-between">
                            <div className='font-medium'>Shipping</div>
                            <div className='font-medium'>Free</div>
                        </div>
                        <div className="line h-px bg-gray-600"></div>

                        <div className="subtotal text-sm flex justify-between">
                            <div className='font-medium'>Total</div>
                            <div className='font-medium flex items-center'>
                                <FaIndianRupeeSign />{numberWithCommas(subtotal)}
                            </div>
                        </div>

                        <div className="btn text-sm flex justify-center items-center pb-5">
                            <button onClick={RedirectToCheckout} className='py-3 px-5 border bg-[#DB4444] text-white rounded-sm'>Proceed To Checkout</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Cart;