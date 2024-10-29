import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashslaes from './Flashsales';
import Sidebar from '../componets/Sidebar';
import FilterComponent from '../componets/FilterComponet';
// import FlashProduct from '../../backend/models/Flashproduct';
import Footer from '../componets/Footer';

const Flashlist = ({ user }) => {
    const [Flashproducts, setFlashProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/Flashproducts`);
                setFlashProducts(response.data);
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
        <>
            <div className="product-list flex w-full gap-5">
                <div className='fixed left-0 xl:w-[21vw] h-screen w-full overflow-x-auto pt-1 xl:pt-0 '><Sidebar /></div>
                <div className="xl:ml-[14vw] flex-1 overflow-auto xl:p-3 pt-7 ">
                    <FilterComponent products={Flashproducts} onFilter={handleFilter} />
                    <div className="flex flex-wrap justify-around items-start mt-5">
                        {/* {filteredProducts.map(Flashproduct => (
                        <Flashslaes key={Flashproduct._id} FlashProduct={Flashproduct} user={user} />
                    ))} */}
                        {filteredProducts.map(product => (
                            <Flashslaes key={product._id} FlashProduct={product} user={user} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default Flashlist;
