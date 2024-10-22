import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import StarRating from '../componets/Starrating';
// import Allproducts from '../AllProducts/Allproducts';
import { MdOutlineDeleteOutline } from "react-icons/md";

const WishList = ({ product, user }) => {
    const [Wishlistitems, setWishlistitems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [iconSize, setIconSize] = useState(17);

    const Allproductref = useRef(null);

    const updateIconSize = () => {
        // Tailwind's xl screen size is 1280px and above
        if (window.innerWidth >= 1280) {
            setIconSize(17); // Large screen size
        } else {
            setIconSize(10); // Smaller screen size
        }
    };

    useEffect(() => {
        updateIconSize(); // Set initial icon size on component mount
        window.addEventListener('resize', updateIconSize); // Update icon size on window resize

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', updateIconSize);
    }, []);

    useEffect(() => {
        const fetchWishlistData = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getToWishList/${userEmail}`);
                setWishlistitems(response.data);
                // console.log("data is",Wishlistitems)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlistData();
    }, []);

    useEffect(() => {
        const fetchWishlistData = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getToFlashWishList/${userEmail}`);
                setWishlistitems(response.data);
                // console.log("data is",Wishlistitems)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlistData();
    }, []);

    useEffect(() => {
        const fetchWishlistData = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getToThismonthWishList/${userEmail}`);
                setWishlistitems(response.data);
                // console.log("data is",Wishlistitems)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlistData();
    }, []);


    const AddtoCart = async () => {
        try {
            const usermail = JSON.parse(localStorage.getItem('user'))?.email;
            const AddDataOfFlashsaleProductsIntoCartRequests = Wishlistitems.map(item => {
                return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addToCart`, {
                    email: usermail,
                    productId: item.productId,
                    quantity: item.quantity, // Send the updated quantity
                    size: item.size,// Ensure size is a single value
                    offerPrice: item.offerPrice
                });
            });

            const AddDataOfAllProductsIntoCartRequests = Wishlistitems.map(item => {
                return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addToCartallproduct`, {
                    email: usermail,
                    productId: item.productId,
                    quantity: item.quantity, // Send the updated quantity
                    size: item.size,// Ensure size is a single value
                    offerPrice: item.offerPrice
                });
            });

            const AddDataOfThisMonthProductsIntoCartRequests = Wishlistitems.map(item => {
                return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addToCartThismonthBestProducts`, {
                    email: usermail,
                    productId: item.productId,
                    quantity: item.quantity, // Send the updated quantity
                    size: item.size,// Ensure size is a single value
                    offerPrice: item.offerPrice
                });
            });

            // Wait for all update requests to finish
            // await Promise.all(AddDataOfThisMonthProductsIntoCartRequests);
            await Promise.any([
                ...AddDataOfAllProductsIntoCartRequests,
                ...AddDataOfFlashsaleProductsIntoCartRequests,
                ...AddDataOfThisMonthProductsIntoCartRequests

            ]);

            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error.response?.data || error.message);
        }
    };

    const handleDelete = async (productId) => {
        try {
            const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
            console.log(`Attempting to delete item: ${userEmail}, ${productId}`);
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteWishlistItem/${userEmail}/${productId}`);
            setWishlistitems(prevItems => prevItems.filter(item => item.productId !== productId));
        } catch (err) {
            // setError(err.message);
        }
    };


    if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
    if (error) return <p className=' mt-10'>Error: {error}</p>;

    return (
        <>
            <main className='main '>
                <div className='flex justify-between items-center m-5 xl:m-12'>
                    <div className=' font-medium'>Wishlist ({Wishlistitems.length}) </div>
                    <div><button className='font-medium border bg-white pt-3 pb-3 pr-7 pl-7 hover:bg-[#DB4444] hover:text-white'>Move All To Bog</button></div>
                </div>
                {Wishlistitems.length == 0 ? (
                    <div className="empty-cart text-center my-14">
                        <p className="text-lg font-semibold">No items are added to the cart</p>
                    </div>
                ) : (
                    <div className="Cards xl:flex xl:flex-nowrap flex flex-wrap xl:justify-normal justify-around items-center xl:m-10 xl:gap-10 xl:overflow-auto xl:scrollbar-hidden xl:overflow-x-auto"
                        ref={Allproductref}
                        style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>

                        {Wishlistitems.map((item) => (
                            <div key={item.productId}
                                className="card xl:w-[180px] w-[180px] h-full p-2 flex flex-col items-start justify-start relative hover:bg-[#ffff] hover:scale-105 transition-transform hover:shadow-md mb-20">
                                <div className="xl:w-[180px] xl:h-[240px] w-full h-[180px] shadow-md  rounded-md  relative flex justify-center items-center overflow-hidden">
                                    <img className="object-contain  w-full h-full" src={item.image} alt={item.name} />
                                    <div className='absolute top-3 right-3 cursor-pointer' onClick={() => handleDelete(item.productId)} ><MdOutlineDeleteOutline size={25} /></div>
                                    <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-2" onClick={AddtoCart}>
                                        Add to Cart
                                    </button>
                                </div>
                                <div className=''>
                                    <div className="title font-medium text-[12px] xl:text-[16px] mt-2">{item.name}</div>
                                    <div className="price flex flex-wrap items-center gap-2 mt-2 ">
                                        <div className="Offer-price font-medium text-[10px] xl:text-[16px] text-[#DB4444] flex items-center">
                                            <FaIndianRupeeSign size={iconSize} /> {item.offerPrice}
                                        </div>
                                        <div className="Actual-price font-medium text-[10px] xl:text-lg line-through text-gray-400 flex items-center">
                                            <FaIndianRupeeSign size={iconSize} /> {item.actualPrice}
                                        </div>
                                        <div className="offer-per font-medium text-[10px] xl:text-lg text-green-500">{item.discount}% off</div>
                                    </div>
                                    <div className="rating mt-2 xl:text-[16px] text-[10px]"><StarRating rating={item.rating} /></div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </main>


        </>
    );
};

export default WishList;