
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThisMonth from './ThisMonth';
import Sidebar from '../componets/Sidebar';
import FilterComponent from '../componets/FilterComponet';

const ThismonthList = ({ user }) => {
    const [Bestproducts, setBestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/Thismonth');
                setBestProducts(response.data);
                setFilteredProducts(response.data)
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
        <div className="product-list flex w-full gap-5">
            <div className='fixed left-0 w-[21vw] h-screen '><Sidebar /></div>
            <div className="ml-[21vw] flex-1 overflow-auto p-3 ">
                <FilterComponent products={Bestproducts} onFilter={handleFilter} />
                <div className="flex flex-wrap justify-around items-start gap-4 mt-5">
                    {/* {Bestproducts.map(ThismonthBestProduct => (
                        <ThisMonth key={ThismonthBestProduct._id} ThismonthBestProduct={ThismonthBestProduct} user={user} />
                    ))} */}

                    {filteredProducts.map(product => (
                        <ThisMonth key={product._id} ThismonthBestProduct={product} user={user} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ThismonthList;
