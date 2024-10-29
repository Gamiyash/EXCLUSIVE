import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProducts = () => {
    const [Products, setProducts] = useState({
        name: '',
        image: '',
        sideimg1: '',
        sideimg2: '',
        sideimg3: '',
        sideimg4: '',
        offerPrice: '',
        actualPrice: '',
        discount: '',
        rating: '',
        type: '',
        keyword: '',
        discription: '',
        size: ''
    });

    const handleProductsChange = (e) => {
        const { name, value } = e.target;

        setProducts((prevProducts) => ({
            ...prevProducts,
            [name]: (name === 'offerPrice' || name === 'actualPrice' || name === 'rating') ? parseFloat(value) : value,
        }));
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;

        setProducts((prevProducts) => ({
            ...prevProducts,
            [name]: value.split(',').map(item => item.trim()) // Convert comma-separated input to array
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:3000/api/add-products`, {
                ...Products
            })
            alert('Products details saved successfully');
            console.log(Products)
        } catch (error) {
            console.log("Error to save Products:", error)
            alert('Failed to save Products details');
        }

    }

    return (
        <div>
            <div className="details flex flex-col gap-3">
                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="name">Enter Product Name<span className='text-red-300 text-lg'>*</span></label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="name" value={Products.name} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="image">Image</label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="image" value={Products.image} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="image">sideimg1</label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="sideimg1" value={Products.sideimg1} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="image">sideimg2</label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="sideimg2" value={Products.sideimg2} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="image">sideimg3</label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="sideimg3" value={Products.sideimg3} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="image">sideimg4</label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="sideimg4" value={Products.sideimg4} onChange={handleProductsChange} />
                </div>

                {/* Repeat similar structure for other fields */}

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="offerPrice">Offer Price<span className='text-red-300 text-lg'>*</span></label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="number" name="offerPrice" value={Products.offerPrice} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="actualPrice">Actual Price<span className='text-red-300 text-lg'>*</span></label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="number" name="actualPrice" value={Products.actualPrice} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="image">discount</label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="discount" value={Products.discount} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="rating">Rating<span className='text-red-300 text-lg'>*</span></label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="number" name="rating" value={Products.rating} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="keyword">Keywords (comma separated)<span className='text-red-300 text-lg'>*</span></label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="keyword" value={Products.keyword} onChange={handleArrayChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="size">Size (comma separated)<span className='text-red-300 text-lg'>*</span></label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="size" value={Products.size} onChange={handleArrayChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="image">discription</label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="discription" value={Products.discription} onChange={handleProductsChange} />
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label className='text-gray-400' htmlFor="image">type</label>
                    <input className='bg-gray-100 h-10 rounded-md px-3' type="text" name="type" value={Products.type} onChange={handleProductsChange} />
                </div>
                <div className='p-5'>
                    <button onClick={handleSubmit}>submit</button>
                </div>

                {/* Add other fields as needed */}
            </div>
        </div>
    );
};

export default AddProducts;
