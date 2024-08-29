
import React, { useState } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
// import { FaIndianRupeeSign } from 'react-icons/fa';
import StarRating from '../componets/Starrating';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AiFillHeart } from "react-icons/ai";


const WomenFashionproducts = ({ WomenFashion, user }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { name, image, offerPrice, actualPrice, discount, rating, discription, _id,type } = WomenFashion;


    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/WomenFashionproductsDetails/${_id}`); // Redirect to product details page
    };

    const AddtoCart = async () => {
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

            await axios.post('http://localhost:3000/api/addToCartWomenFashionProducts', payload, {
                withCredentials: true
            });

            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error.response?.data || error.message);
        }
    };

    const AddtoWishList = async () => {
        try {
            if (!user || !user.email) {
                console.error('User email is undefined');
                return;
            }
            console.log('User object:', user);
            // const username = user.email;
            const payload1 = {
                email: user.email,  // Ensure user is defined and has an email
                productId: _id,      // Ensure _id is defined
                offerPrice: offerPrice,  // Ensure offerPrice is a valid number
                discription: discription,  // Ensure discription is not empty
                quantity: 1,         // Ensure quantity is a valid number
                size: "M"            // Ensure size is a valid string
            };

            console.log('Payload1:', payload1);

            await axios.post('http://localhost:3000/api/addToWishList', payload1, {
                withCredentials: true
            });

            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error.response?.data || error.message);
        }
    };



    return (
        <div
            className="card w-[250px] p-2 flex flex-col items-start justify-start relative hover:bg-[#ffff] hover:scale-105 transition-transform hover:shadow-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-[250px] h-[300px] shadow-md  bg-white  rounded-md border-gray-300 relative flex justify-center items-center overflow-hidden">
                <img className="object-contain w-full h-full" src={image} alt={name} onClick={handleClick} />
                {isHovered && (
                    <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-2" onClick={AddtoCart}>
                        Add to Cart
                    </button>
                )}
                <button className="absolute top-0 right-10 text-white py-2" onClick={AddtoWishList} >
                    <AiFillHeart size={30} color='gray' />
                </button>
            </div>
            <div className=''>
              
                <div className="title font-medium text-lg mt-2">{name}</div>
                <div className="price flex items-center gap-2 mt-2 ">
                    <div className="Offer-price font-medium text-xl text-[#DB4444] flex items-center">
                        <FaIndianRupeeSign size={17} /> {offerPrice}
                    </div>
                    <div className="Actual-price font-medium text-xl line-through text-gray-400 flex items-center">
                        <FaIndianRupeeSign size={17} /> {actualPrice}
                    </div>
                    <div className="offer-per font-medium text-xl text-green-500">{discount}% off</div>
                </div>
                <div className="rating mt-2"><StarRating rating={rating} /></div>

            </div>
        </div>
    );
};

export default WomenFashionproducts;
