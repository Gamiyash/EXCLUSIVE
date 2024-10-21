
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Allproducts from './Allproducts';
import Sidebar from '../componets/Sidebar';
import FilterComponent from '../componets/FilterComponet';

const ProductList = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleFilter = (filtered) => {
        setFilteredProducts(filtered);
    };

    if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="product-list flex w-full ">
                <div className='fixed left-0 w-[21vw] h-screen '><Sidebar /></div>
                <div className="ml-[14vw] flex-1 overflow-auto p-3 ">
                    <FilterComponent products={products} onFilter={handleFilter} />
                    <div className="flex flex-wrap justify-around items-start mt-5">
                        {/* {products.map(product => (
                            <Allproducts key={product._id} product={product} user={user} />
                        ))} */}

                        {filteredProducts.map(product => (
                            <Allproducts key={product._id} product={product} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;