import React from 'react'
import { useState } from 'react';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useEffect } from 'react';
import axios from 'axios';
import CouponComponent from '../componets/CupponComponet';
import Wheel from '../componets/RollingWheeler';
import { RxCross2 } from "react-icons/rx";
import { IoMdHappy } from "react-icons/io";
// import { FaTrash } from 'react-icons/fa';
// import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [CheckoutItems, setCheckoutItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [discount, setDiscount] = useState(0);  // Discount percentage
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    // Billing details state
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        city: '',
        phoneNumber: '',
        emailAddress: '',
    });
    const [wheelVisible, setWheelVisible] = useState(false);
    const [wheelSpun, setWheelSpun] = useState(false);
    const [wheelIconVisible, setWheelIconVisible] = useState(true);
    const [isMsgVisible, setIsMsgVisible] = useState(true);


    const handleBillingChange = (e) => {
        setBillingDetails({
            ...billingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitBillingDetails = async () => {
        try {
            const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
            await axios.post('http://localhost:3000/api/saveUsersBillingDetails', {
                email: userEmail,
                ...billingDetails,
            });
            alert('Billing details saved successfully');
        } catch (error) {
            console.error('Error saving billing details:', error);
            alert('Failed to save billing details');
        }
    };
    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
                const response = await axios.get(`http://localhost:3000/api/getUsersBillingDetails/${userEmail}`);
                setBillingDetails(response.data);
            } catch (err) {
                // console.error('Error fetching billing details:', err);
                // setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCheckoutData();
    }, []);


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // console.log("the user is",user,user.email)
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`http://localhost:3000/api/getAllProductsCheckoutData/${userEmail}`);
                setCheckoutItems(response.data);
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
                const response = await axios.get(`http://localhost:3000/api/getFlashProductsCheckoutData/${userEmail}`);
                setCheckoutItems(response.data);
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
                const response = await axios.get(`http://localhost:3000/api/getThisMonthBestProductsCheckoutData/${userEmail}`);
                setCheckoutItems(response.data);
            } catch (err) {
                // setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
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
    useEffect(() => {
        const calculateTotal = () => {
            const subtotal = CheckoutItems.reduce((acc, item) => acc + item.offerPrice * (item.quantity || 1), 0);
            const discountAmount = (subtotal * discount) / 100;
            const totalWithDiscount = subtotal - discountAmount;
            setTotalAfterDiscount(totalWithDiscount);
        };
        calculateTotal();
    }, [CheckoutItems, discount]);

    if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const calculateSubtotal = (price, quantity) => price * quantity;

    const subtotal = CheckoutItems.reduce((acc, item) => acc + calculateSubtotal(item.offerPrice, item.quantity || 1), 0);

    // Handle Wheel Spin
    const handleWheelSpin = () => {
        if (!wheelSpun) {
            setWheelSpun(true); // Ensure it spins only once
            //   setWheelVisible(true); // Show the wheel
            setWheelIconVisible(false); // Hide the wheel icon
            //   setWheelVisible(false);
            setTimeout(() => {
                setWheelVisible(false); // Hide the wheel after 10 seconds
            }, 6000);
        }
    };

    const handleCloseMsg = () => {
        setIsMsgVisible(false);
    };

    return (
        <>
            {
                wheelVisible && (
                    <div className="wheel-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <Wheel onComplete={handleWheelSpin}
                            segments={['1%', '3%', '2%', '7%', '0%', '1%', '6%', '30%']} // Example segments
                            colors={['#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F', '#00FFFF', '#007FFF']} />
                    </div>
                )
            }

            <div className="direction mt-10 flex justify-between px-32 items-center ">
                <span>Home / <span className='font-medium'>Checkout</span></span>

                {/* Wheel Icon */}
                {wheelIconVisible && (
                    <div className="">
                        <img
                            // onClick={handleWheelSpin}
                            onClick={() => setWheelVisible(true)}
                            width={30}
                            src="../lottery-game.png"
                            alt="Spin the Wheel"
                            className="cursor-pointer relative "
                        />
                        {/* <div className='LuckydrawMsg absolute right-10 mt-5 border border-gray-600 p-3 flex w-56'>
                            Try your luck and join the draw  for a chance to win amazing discounts!
                        </div> */}
                        {isMsgVisible && (
                            <div className="z-50 flex items-center justify-end absolute top-32 mt-10 right-10">
                                <div className="bg-background p-6 rounded-lg shadow-lg max-w-[400px] w-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-foreground text-green-500 font-sans flex gap-2 items-center"><span>Try Your Luck</span> <span><IoMdHappy size={25} /></span></h3>
                                        <button onClick={handleCloseMsg} variant="ghost" size="icon" className="rounded-full">
                                            <RxCross2 className="w-5 h-5 text-muted-foreground" />
                                        </button>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Try your luck and join the draw  for a chance to win amazing discounts!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                )}
            </div>


            <main className={`main ml-32 flex gap-52 ${wheelVisible ? 'blur-sm' : ''}`}>  {/*overflow-auto scrollbar-hidden */}

                <section className="BillDetails w-[30vw] mt-10 flex flex-col gap-10 mb-10">

                    <h1 className='font-medium text-3xl tracking-wider text-gray-950'>Billing Details</h1>

                    <div className="details flex flex-col gap-3">
                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-400' htmlFor="FirstName ">First Name<span className='text-red-300 text-lg'>*</span></label>
                            <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="firstName" value={billingDetails.firstName} onChange={handleBillingChange} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-400' htmlFor="FirstName">Company Name</label>
                            <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="companyName" value={billingDetails.companyName} onChange={handleBillingChange} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-400' htmlFor="FirstName">Street Address<span className='text-red-300 text-lg'>*</span></label>
                            <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="streetAddress" value={billingDetails.streetAddress} onChange={handleBillingChange} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-400' htmlFor="FirstName">Aparment,floor,etc.(optional)</label>
                            <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="apartment" value={billingDetails.apartment} onChange={handleBillingChange} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-400' htmlFor="FirstName">Town/City<span className='text-red-300 text-lg'>*</span></label>
                            <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="city" value={billingDetails.city} onChange={handleBillingChange} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-400' htmlFor="FirstName">Phone Number<span className='text-red-300 text-lg'>*</span></label>
                            <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="phoneNumber" value={billingDetails.phoneNumber} onChange={handleBillingChange} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-400' htmlFor="FirstName">Email Addres<span className='text-red-300 text-lg'>*</span></label>
                            <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="emailAddress" value={billingDetails.emailAddress} onChange={handleBillingChange} />
                        </div>
                        <div className="Guidelines text-green-400 flex items-center gap">
                            <span className='text-2xl'>*</span>Add the details once, then edit if needed. <span className='text-2xl'>*</span>
                        </div>
                    </div>

                    <div className="SubmitBtn">
                        <button className='p-3 pr-8 pl-8 border bg-[#DB4444] text-white rounded-sm' onClick={handleSubmitBillingDetails}>Submit</button>
                    </div>
                </section>

                <section className='ProductsData flex flex-col gap-7 mt-36'>
                    <div className="products flex flex-col gap-7 overflow-auto scrollbar-hidden w-[40vw] max-h-[30vh]">
                        {CheckoutItems.map((item) => (
                            <div key={item.productId} className="Product">
                                <div className="ProductData bg-white flex  items-center font-medium">
                                    <span className='w-1/2 flex items-center gap-3'>
                                        <img width={30} src={item.image} alt={item.name} />
                                        <div className="title overflow-auto flex flex-col">{item.name} <span>Quantaty:({item.quantity})</span></div>
                                    </span>
                                    <span className='w-1/2 flex items-center justify-end text-right'>
                                        <FaIndianRupeeSign />
                                        {numberWithCommas(item.offerPrice)}
                                    </span>
                                </div>
                            </div>

                        ))}
                    </div>

                    <div className="CartTotal text-lg container w-full flex flex-col gap-3">
                        <div className="subtotal flex justify-between">
                            <div className='font-medium'>SubTotal:</div>
                            <div className='font-medium flex items-center'>
                                <FaIndianRupeeSign />{numberWithCommas(subtotal)}
                            </div>
                        </div>
                        <div className="line h-px bg-gray-600"></div>

                        <div className="subtotal flex justify-between">
                            <div className='font-medium'>Shipping:</div>
                            <div className='font-medium'>Free</div>
                        </div>
                        <div className="line h-px bg-gray-600"></div>

                        <div className="subtotal flex justify-between">
                            <div className='font-medium'>Total:</div>
                            <div className='font-medium flex items-center'>
                                <FaIndianRupeeSign />  {numberWithCommas(totalAfterDiscount)}
                            </div>
                        </div>
                    </div>

                    <div className="PaymentMethods flex flex-col gap-5">
                        <div className="Online">
                            <label className={`flex gap-2 items-center font-medium text-lg ${selectedValue === "Bank" ? 'text-black' : ''}`}>
                                <input
                                    className="scale-125 cursor-pointer"
                                    type="radio"
                                    value="Bank"
                                    checked={selectedValue === "Bank"}
                                    onChange={handleChange}
                                />
                                Bank
                            </label>
                        </div>

                        <div className="Online">
                            <label className={`flex gap-2 items-center font-medium text-lg ${selectedValue === "CashOnDelivery" ? 'fill-white' : ''}`}>
                                <input
                                    className="scale-125 cursor-pointer"
                                    type="radio"
                                    value="CashOnDelivery"
                                    checked={selectedValue === "CashOnDelivery"}
                                    onChange={handleChange}
                                />
                                Cash on Delivery
                            </label>
                        </div>
                    </div>
                    {/* Coupon component */}
                    <CouponComponent onApplyCoupon={setDiscount} />

                    <div className="Placeorder">
                        <button className='p-3 pr-8 pl-8 border bg-[#DB4444] text-white rounded-sm'>Place Order</button>
                    </div>

                </section>
            </main>

        </>
    )
};

export default Checkout
