
import React, { useState } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import StarRating from '../componets/Starrating';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AiFillHeart } from "react-icons/ai";

const ThisMonth = ({ ThismonthBestProduct, user }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { name, image, offerPrice, actualPrice, discount, rating, discription, _id } = ThismonthBestProduct;

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/ThismonthBestProductDetails/${_id}`); // Redirect to product details page
    };


    const AddtoCart = async () => {
        if (user) {
            try {
                if (!user || !user.email) {
                    console.error('User email is undefined');
                    return;
                }
                console.log('User object:', user);
                // const username = user.email;
                const payload = {
                    email: user.email,  // Ensure user is defined and has an email
                    productId: _id,      // Ensure _id is defined
                    offerPrice: offerPrice,  // Ensure offerPrice is a valid number
                    discription: discription,  // Ensure discription is not empty
                    quantity: 1,         // Ensure quantity is a valid number
                    size: "M"            // Ensure size is a valid string
                };

                console.log('Payload:', payload);

                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addToCartThismonthBestProducts`, payload, {
                    withCredentials: true
                });


                // await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/Checkout', payload, {
                //     withCredentials: true
                // });

                alert('Product added to cart!');
            } catch (error) {
                console.error('Error adding product to cart:', error.response?.data || error.message);
            }
        } else {
            alert("Please Login")
            navigate('/login')
        }
    };


    const AddtoWishList = async () => {
        if (user) {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
                const payload1 = {
                    email: userEmail,  // Ensure user is defined and has an email
                    productId: _id,      // Ensure _id is defined
                    offerPrice: offerPrice,  // Ensure offerPrice is a valid number
                    discription: discription,  // Ensure discription is not empty
                    quantity: 1,         // Ensure quantity is a valid number
                    size: "M"            // Ensure size is a valid string
                };

                console.log('Payload1:', payload1);

                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addToThismonthWishList`, payload1, {
                    withCredentials: true
                });

                alert('Product added to Wishlist!');
            } catch (error) {
                console.error('Error adding product to cart:', error.response?.data || error.message);
            }
        } else {
            alert("Please Login")
            navigate('/login')
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

    return (

        <div
            className="card p-2 rounded-md xl:w-[180px] w-[140px] h-full flex flex-col items-start justify-start relative  hover:bg-[#ffff] hover:scale-105 transition-transform hover:shadow-md "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="xl:w-[180px] xl:h-[220px] w-[140px] h-[180px] bg-white shadow-md rounded-md border-gray-300 relative flex justify-center items-center overflow-hidden">
                <img className="object-contain w-full h-full" src={image} alt={name} onClick={handleClick} />
                {isHovered && (
                    <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-1" onClick={AddtoCart}>
                        Add to Cart
                    </button>
                )}
                <button className="absolute top-0 right-10 text-white py-2" onClick={AddtoWishList}>
                    <AiFillHeart size={30} color='gray' />
                </button>
            </div>
            <div className="title font-medium text-[10px] xl:text-[16px]  mt-2">{name}</div>
            <div className="price flex flex-wrap items-center gap-2 mt-2">
                <div className="Offer-price font-medium text-[10px] xl:text-lg text-[#DB4444] flex items-center">
                    <FaIndianRupeeSign size={17} /> {numberWithCommas(offerPrice)}
                </div>
                <div className="Actual-price font-medium text-[10px] xl:text-lg line-through text-gray-400 flex items-center">
                    <FaIndianRupeeSign size={17} /> {numberWithCommas(actualPrice)}
                </div>
                <div className="offer-per font-medium text-[10px] xl:text-lg text-green-500">{discount}% off</div>
            </div>
            <div className="rating xl:text-[16px] text-[10px] mt-2"><StarRating rating={rating} /></div>

        </div>
    );
};

export default ThisMonth;
