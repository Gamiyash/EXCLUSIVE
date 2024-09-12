// import React, { useState } from 'react';
// import { useEffect, useRef } from 'react';
// import axios from 'axios';
// import { FaIndianRupeeSign } from 'react-icons/fa6';
// import StarRating from '../componets/Starrating';
// // import Allproducts from '../AllProducts/Allproducts';
// import { MdOutlineDeleteOutline } from "react-icons/md";
// import { useParams } from 'react-router-dom';

// const WishList = ({ }) => {
//     // const { id } = useParams();
//     const [Wishlistitems, setWishlistitems] = useState([]);
//     const [isHovered, setIsHovered] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const Allproductref = useRef(null);

//     const scrollLeft = (ref) => {
//         if (ref.current) {
//             ref.current.scrollBy({ left: -250, behavior: 'smooth' });
//         }
//     };

//     const scrollRight = (ref) => {
//         if (ref.current) {
//             ref.current.scrollBy({ left: 250, behavior: 'smooth' });
//         }
//     };


//     useEffect(() => {
//         const fetchWishlistData = async () => {
//             try {
//                 const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
//                 const response = await axios.get(`http://localhost:3000/api/getToWishList/${userEmail}`);
//                 setWishlistitems(response.data);
//                 // console.log("data is",Wishlistitems)
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchWishlistData();
//     }, []);

//     useEffect(() => {
//         const fetchWishlistData = async () => {
//             try {
//                 const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
//                 const response = await axios.get(`http://localhost:3000/api/getToFlashWishList/${userEmail}`);
//                 setWishlistitems(response.data);
//                 // console.log("data is",Wishlistitems)
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchWishlistData();
//     }, []);

//     useEffect(() => {
//         const fetchWishlistData = async () => {
//             try {
//                 const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
//                 const response = await axios.get(`http://localhost:3000/api/getToThismonthWishList/${userEmail}`);
//                 setWishlistitems(response.data);
//                 // console.log("data is",Wishlistitems)
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchWishlistData();
//     }, []);


//     // const AddtoCart = async () => {
//     //     try {
//     //         const usermail = JSON.parse(localStorage.getItem('user'))?.email;
//     //         const AddDataIntoCheckoutRequests = Wishlistitems.map(item => {
//     //             return axios.post('http://localhost:3000/api/addToCartallproduct', {
//     //                 email: usermail,
//     //                 productId: item.productId,
//     //                 quantity: item.quantity || 1, // Send the updated quantity
//     //                 size: item.size  || 'M',// Ensure size is a single value
//     //                 offerPrice: item.offerPrice
//     //             });
//     //         });

//     //          // Wait for all update requests to finish
//     //          await Promise.all(AddDataIntoCheckoutRequests);

//     //         alert('Product added to cart!');
//     //     } catch (error) {
//     //         console.error('Error adding product to cart:', error.response?.data || error.message);
//     //     }
//     // };

//     const handleDelete = async (productId) => {
//         try {
//             const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
//             console.log(`Attempting to delete item: ${userEmail}, ${productId}`);
//             await axios.delete(`http://localhost:3000/api/deleteWishlistItem/${userEmail}/${productId}`);
//             setWishlistitems(prevItems => prevItems.filter(item => item.productId !== productId));
//         } catch (err) {
//             // setError(err.message);
//         }
//     };


//     if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
//     if (error) return <p className=' mt-10'>Error: {error}</p>;

//     return (
//         <>
//             <main className='main overflow-auto scrollbar-hidden'>
//                 <div className='flex justify-between m-12'>
//                     <div className=' font-medium'>Wishlist ({Wishlistitems.length}) </div>
//                     <div><button className='font-medium border bg-white pt-3 pb-3 pr-7 pl-7 hover:bg-[#DB4444] hover:text-white'>Move All To Bog</button></div>
//                 </div>
//                 {Wishlistitems.length == 0 ? (
//                     <div className="empty-cart text-center my-14">
//                         <p className="text-lg font-semibold">No items are added to the cart</p>
//                     </div>
//                 ) : (
//                     <div className="Cart flex m-10 gap-10 overflow-auto scrollbar-hidden overflow-x-auto"
//                         ref={Allproductref}
//                         style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>

//                         {Wishlistitems.map((item) => (
//                             <div key={item.productId}
//                                 className="card w-[250px] p-2 flex flex-col items-start justify-start relative hover:bg-[#ffff] hover:scale-105 transition-transform hover:shadow-md mb-20">
//                                 <div className="w-[250px]  h-[200px] shadow-md  rounded-md  relative flex justify-center items-center overflow-hidden">
//                                     <img className="object-contain  w-full h-full" src={item.image} alt={item.name} />
//                                     <div className='absolute top-3 right-3 cursor-pointer' onClick={() => handleDelete(item.productId)} ><MdOutlineDeleteOutline size={25} /></div>
//                                     <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-2" onClick={AddtoCart}>
//                                         Add to Cart
//                                     </button>
//                                 </div>
//                                 <div className=''>
//                                     <div className="title font-medium text-lg mt-2">{item.name}</div>
//                                     <div className="price flex items-center gap-2 mt-2 ">
//                                         <div className="Offer-price font-medium text-xl text-[#DB4444] flex items-center">
//                                             <FaIndianRupeeSign size={17} /> {item.offerPrice}
//                                         </div>
//                                         <div className="Actual-price font-medium text-xl line-through text-gray-400 flex items-center">
//                                             <FaIndianRupeeSign size={17} /> {item.actualPrice}
//                                         </div>
//                                         <div className="offer-per font-medium text-xl text-green-500">{item.discount}% off</div>
//                                     </div>
//                                     <div className="rating mt-2"><StarRating rating={item.rating} /></div>
//                                 </div>
//                             </div>
//                         ))}

//                     </div>
//                 )}
//             </main>


//         </>
//     );
// };

// export default WishList;


import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import StarRating from '../componets/Starrating';
// import Allproducts from '../AllProducts/Allproducts';
import { MdOutlineDeleteOutline } from "react-icons/md";

const WishList = ({ product }) => {
    const [Wishlistitems, setWishlistitems] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Allproductref = useRef(null);

    // const { name, image, offerPrice, actualPrice, discount, rating, discription, _id, type, keyword } = product;

    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: -250, behavior: 'smooth' });
        }
    };

    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: 250, behavior: 'smooth' });
        }
    };




    useEffect(() => {
        const fetchWishlistData = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Replace with actual email logic or context
                const response = await axios.get(`http://localhost:3000/api/getToWishList/${userEmail}`);
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
                const response = await axios.get(`http://localhost:3000/api/getToFlashWishList/${userEmail}`);
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
                const response = await axios.get(`http://localhost:3000/api/getToThismonthWishList/${userEmail}`);
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
                return axios.post('http://localhost:3000/api/addToCart', {
                    email: usermail,
                    productId: item.productId,
                    quantity: item.quantity, // Send the updated quantity
                    size: item.size,// Ensure size is a single value
                    offerPrice: item.offerPrice
                });
            });

            const AddDataOfAllProductsIntoCartRequests = Wishlistitems.map(item => {
                return axios.post('http://localhost:3000/api/addToCartallproduct', {
                    email: usermail,
                    productId: item.productId,
                    quantity: item.quantity, // Send the updated quantity
                    size: item.size,// Ensure size is a single value
                    offerPrice: item.offerPrice
                });
            });

            const AddDataOfThisMonthProductsIntoCartRequests = Wishlistitems.map(item => {
                return axios.post('http://localhost:3000/api/addToCartThismonthBestProducts', {
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
            await axios.delete(`http://localhost:3000/api/deleteWishlistItem/${userEmail}/${productId}`);
            setWishlistitems(prevItems => prevItems.filter(item => item.productId !== productId));
        } catch (err) {
            // setError(err.message);
        }
    };


    if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
    if (error) return <p className=' mt-10'>Error: {error}</p>;

    return (
        <>
            <main className='main overflow-auto scrollbar-hidden'>
                <div className='flex justify-between m-12'>
                    <div className=' font-medium'>Wishlist ({Wishlistitems.length}) </div>
                    <div><button className='font-medium border bg-white pt-3 pb-3 pr-7 pl-7 hover:bg-[#DB4444] hover:text-white'>Move All To Bog</button></div>
                </div>
                {Wishlistitems.length == 0 ? (
                    <div className="empty-cart text-center my-14">
                        <p className="text-lg font-semibold">No items are added to the cart</p>
                    </div>
                ) : (
                    <div className="Cart flex m-10 gap-10 overflow-auto scrollbar-hidden overflow-x-auto"
                        ref={Allproductref}
                        style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>

                        {Wishlistitems.map((item) => (
                            <div key={item.productId}
                                className="card w-[250px] p-2 flex flex-col items-start justify-start relative hover:bg-[#ffff] hover:scale-105 transition-transform hover:shadow-md mb-20">
                                <div className="w-[250px]  h-[200px] shadow-md  rounded-md  relative flex justify-center items-center overflow-hidden">
                                    <img className="object-contain  w-full h-full" src={item.image} alt={item.name} />
                                    <div className='absolute top-3 right-3 cursor-pointer' onClick={() => handleDelete(item.productId)} ><MdOutlineDeleteOutline size={25} /></div>
                                    <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-2" onClick={AddtoCart}>
                                        Add to Cart
                                    </button>
                                </div>
                                <div className=''>
                                    <div className="title font-medium text-lg mt-2">{item.name}</div>
                                    <div className="price flex items-center gap-2 mt-2 ">
                                        <div className="Offer-price font-medium text-xl text-[#DB4444] flex items-center">
                                            <FaIndianRupeeSign size={17} /> {item.offerPrice}
                                        </div>
                                        <div className="Actual-price font-medium text-xl line-through text-gray-400 flex items-center">
                                            <FaIndianRupeeSign size={17} /> {item.actualPrice}
                                        </div>
                                        <div className="offer-per font-medium text-xl text-green-500">{item.discount}% off</div>
                                    </div>
                                    <div className="rating mt-2"><StarRating rating={item.rating} /></div>
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