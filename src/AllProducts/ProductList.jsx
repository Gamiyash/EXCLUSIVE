
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Allproducts from './Allproducts';
import Sidebar from '../componets/Sidebar';

const ProductList = ({user}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className="product-list flex w-full gap-5">
            <div className='fixed left-0 w-[21vw] h-screen '><Sidebar /></div>
            <div className="ml-[21vw] flex-1 overflow-auto p-3 ">
                <div className="flex flex-wrap justify-around items-start gap-2 mt-5">
                    {products.map(product => (
                        <Allproducts key={product._id} product={product} user={user}  />
                    ))}
                     {/* {products.filter((product)=>product.type=="watch").map(product => (
                        <Allproducts key={product._id} product={product} user={user} />
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
