
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Allproducts from '../AllProducts/Allproducts';
import Sidebar from '../componets/Sidebar';


const ElectronicsproductsList = ({user}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("The user is",user)

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

    if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <div className="product-list flex w-[100vw] gap-6">
            <div className='fixed left-0 w-[21vw] h-screen '><Sidebar /></div>
            <div className="ml-[21vw] flex-1 overflow-auto p-3 ">
                <div className="flex flex-wrap justify-evenly items-start gap-2 mt-5 ">
                    {products.filter((product)=>product.type=="Electronics").map(product => (
                        <Allproducts key={product._id} product={product} user={user} />
                    ))}
                </div>
            </div>
        </div>
       
        </>
    );
};

export default ElectronicsproductsList;