


import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../componets/Starrating';
import { FaIndianRupeeSign, FaPlus, FaMinus } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import Allproducts from '../AllProducts/Allproducts';


const AllProductDetails = ({ user, productId }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentError, setCommentError] = useState('');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const Allproductref = useRef(null);

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
        const fetchProduct = async () => {
            try {
                if (!id) {
                    setError('Product ID is missing');
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(response.data);
                setMainImage(response.data.image);
                // Fetch comments
                const commentsResponse = await axios.get(`http://localhost:3000/api/products/${id}/comments`);
                setComments(commentsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error.message);
                setError('Error fetching product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleIncrement = () => setQuantity(prevQuantity => prevQuantity + 1);
    const handleDecrement = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

    const handleBuyNow = async () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        // const userEmail = JSON.parse(localStorage.getItem('user'))?.email

        try {
            const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
            console.log('User object:', user);
            // const username = user.email;
            const payload = {
                email: userEmail,  // Ensure user is defined and has an email
                productId: product._id,      // Ensure _id is defined
                offerPrice: product.offerPrice,  // Ensure offerPrice is a valid number
                discription: product.discription,  // Ensure discription is not empty
                quantity,         // Ensure quantity is a valid number
                size: selectedSize       // Ensure size is a valid string
            };

            // console.log('Payload:', payload);

            await axios.post('http://localhost:3000/api/addToCartallproduct', payload, {
                withCredentials: true
            });

            // await axios.post('http://localhost:3000/api/Checkout', payload, {
            //     withCredentials: true
            // });

            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error.response?.data || error.message);
        }
    };

    const handleSizeChange = (size) => setSelectedSize(size);
    const handleSideImageClick = (img) => setMainImage(img);

    const handleCommentChange = (event) => setNewComment(event.target.value);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            setCommentError('Comment cannot be empty');
            return;
        }
        try {
            await axios.post(`http://localhost:3000/api/products/${id}/comments`, {
                email: user.email,
                comment: newComment
            }, {
                withCredentials: true
            });
            setNewComment('');
            setCommentError('');
            // Fetch updated comments
            const commentsResponse = await axios.get(`http://localhost:3000/api/products/${id}/comments`);
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('Error submitting comment:', error.message);
        }

    };



    const handleCommentDelete = async (commentId) => {
        if (!id) {
            console.error('Product ID is missing');
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}/comments/${commentId}`);
            const response = await axios.get(`http://localhost:3000/api/products/${id}/comments`);
            setComments(response.data);
        } catch (err) {
            console.error('Failed to delete comment:', err.message);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>No product found</p>;

    const { name, image, offerPrice, rating, discription, size, _id, sideimg1, sideimg2, sideimg3, sideimg4 } = product;


    const AddtoWishList = async () => {
        try {
            const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
            const payload1 = {
                email: userEmail,  // Ensure user is defined and has an email
                productId: product._id,      // Ensure _id is defined
                offerPrice: product.offerPrice,  // Ensure offerPrice is a valid number
                discription: product.discription,  // Ensure discription is not empty
                quantity: 1,           // Ensure quantity is a valid number
                size: 'M'       // Ensure size is a valid string 
            };

            await axios.post('http://localhost:3000/api/addToWishList', payload1, {
                withCredentials: true
            });

            alert('Product added to Wishlist!');
        } catch (error) {
            console.error('Error adding product to wishlist:', error.response?.data || error.message);
        }
    };

    const formattedDescription = discription
    const Discription = formattedDescription.replace(/, /g, '\n');
    return (
        <>
            <div className='Main flex w-[100vw]'>
                <div className="img pl-10 w-[60vw] gap-20 flex ">
                    <div className="sideimages mt-20 flex gap-5 flex-col items-center ">
                        <img
                            width={90}
                            className='rounded-md cursor-pointer'
                            src={sideimg1}
                            alt=""
                            onClick={() => handleSideImageClick(sideimg1)}
                        />
                        <img
                            width={90}
                            className='rounded-md cursor-pointer'
                            src={sideimg2}
                            alt=""
                            onClick={() => handleSideImageClick(sideimg2)}
                        />
                        <img
                            width={90}
                            className='rounded-md cursor-pointer'
                            src={sideimg3}
                            alt=""
                            onClick={() => handleSideImageClick(sideimg3)}
                        />
                        <img
                            width={90}
                            className='rounded-md cursor-pointer'
                            src={sideimg4}
                            alt=""
                            onClick={() => handleSideImageClick(sideimg4)}
                        />
                    </div>

                    <div className="bg mt-20 w-[500px] h-[500px] relative flex justify-center items-center overflow-hidden">
                        <img width={450} className='absolute object-contain' src={mainImage} alt={name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                </div>

                <div className="details mt-20 flex flex-col justify-start gap-3 w-[30vw]">
                    <div className="title font-bold text-2xl">{name}</div>

                    <div className="rating">
                        <StarRating rating={rating} />
                    </div>

                    <div className="offerprice flex items-center gap-1 text-xl">
                        <FaIndianRupeeSign size={17} />{numberWithCommas(offerPrice)}
                    </div>

                    <div className="description font-bold text-gray-400 flex whitespace-pre-line">
                        {Discription}
                    </div>

                    <div className="line h-px bg-gray-600"></div>

                    <div className="size flex items-center gap-4">
                        <span className='text-xl'>Size:</span>
                        <div className="sizebtn flex items-center gap-2 font-medium">
                            {size.map((sizeOption) => (
                                <button
                                    key={sizeOption}
                                    onClick={() => handleSizeChange(sizeOption)}
                                    className={`m-1 px-4 py-2 rounded border ${selectedSize === sizeOption ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                >
                                    {sizeOption}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="btns flex gap-5 items-center">
                        <div className="cart-btn flex items-center">
                            <div className="minus">
                                <button
                                    onClick={handleDecrement}
                                    className='border rounded-sm border-gray-600 w-9 h-9 flex justify-center items-center hover:bg-[#DB4444] hover:text-white'
                                >
                                    <FaMinus />
                                </button>
                            </div>
                            <div className="container border rounded-sm border-gray-600 w-16 h-9 flex justify-center items-center">
                                {quantity}
                            </div>
                            <div className="plus">
                                <button
                                    onClick={handleIncrement}
                                    className='border rounded-sm border-gray-600 w-9 h-9 flex justify-center items-center hover:bg-[#DB4444] hover:text-white'
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                        <div className="Buy">
                            <button
                                onClick={handleBuyNow}
                                className='w-32 h-9 border rounded-sm bg-[#DB4444] text-white'
                            >
                                Buy Now
                            </button>
                        </div>
                        <div className="like">
                            <div className='border rounded-sm w-9 h-9 flex justify-center items-center cursor-pointer'>
                                <CiHeart size={25} onClick={AddtoWishList} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="comments-section mt-10 px-10">
                <h3 className="font-bold text-xl mb-4">Comments</h3>
                <div className="comments-list mb-4">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="comment bg-gray-100 p-3 rounded-md mb-2">
                                <p><strong>{comment.email}:</strong> {comment.comment}</p>
                                {user.email === comment.email && (
                                    <button
                                        onClick={() => handleCommentDelete(comment._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>

                <textarea
                    className='w-full h-24 p-2 border rounded-md'
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder='Add a comment...'
                />
                {commentError && <p className='text-red-500'>{commentError}</p>}
                <button
                    onClick={handleCommentSubmit}
                    className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md'
                >
                    Submit Comment
                </button>
            </div>

            <div className="allproducts flex flex-col pl-10 pt-10 gap-9">

                <div className="category flex items-center gap-3">
                    <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
                    <div className="today text-[#DB4444] font-bold">Our Products</div>
                </div>
                <div className="sale-timer flex justify-between items-center">
                    <div className="font-bold text-3xl flex gap-16 tracking-wider">
                        <span>Explore Our Products</span>
                    </div>
                    <div className="two-arrow flex items-center gap-3 pr-24">
                        <div className="left" onClick={() => scrollLeft(Allproductref)}>
                            <FaArrowCircleLeft className="text-gray-400 text-2xl cursor-pointer" />
                        </div>
                        <div className="right" onClick={() => scrollRight(Allproductref)}>
                            <FaArrowCircleRight className="text-gray-400 text-2xl cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div
                    ref={Allproductref}
                    className="cards flex items-center gap-5 overflow-x-auto"
                    style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }} >
                    <div>
                        <div className="product-list flex  gap-3 justify-around mt-5 ">
                            {products.map(product => (
                                <Allproducts key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AllProductDetails;
