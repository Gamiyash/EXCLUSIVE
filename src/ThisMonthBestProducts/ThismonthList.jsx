
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThisMonth from './ThisMonth';
import Sidebar from '../componets/Sidebar';
import FilterComponent from '../componets/FilterComponet';
import Skeliton_Loading from '../componets/Skeliton_Loading'

const ThismonthList = ({ user }) => {
    const [Bestproducts, setBestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/Thismonth`);
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


    if (loading) return <p><Skeliton_Loading /></p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-list flex w-full gap-5">
            <div className='fixed left-0 xl:w-[21vw] h-screen w-full overflow-x-auto pt-1 xl:pt-0 '><Sidebar /></div>
            <div className="xl:ml-[14vw] flex-1 overflow-auto xl:p-3 pt-7 ">
                <FilterComponent products={Bestproducts} onFilter={handleFilter} />
                <div className="flex flex-wrap justify-around items-start mt-5">
                    {filteredProducts.map(product => (
                        <ThisMonth key={product._id} ThismonthBestProduct={product} user={user} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ThismonthList;
