import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashslaes from './Flashsales';
import Sidebar from '../componets/Sidebar';
// import FlashProduct from '../../backend/models/Flashproduct';

const Flashlist = ({user}) => {
    const [Flashproducts, setFlashProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/Flashproducts');
                setFlashProducts(response.data);
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
        <div className="product-list flex w-[100vw] gap-5">
            <div className='fixed left-0 w-[21vw] h-screen '><Sidebar /></div>
            <div className="ml-[21vw] flex-1 overflow-auto p-4 ">
                <div className="flex flex-wrap justify-around items-start gap-4 mt-5">
                    {Flashproducts.map(Flashproduct => (
                        <Flashslaes key={Flashproduct._id} FlashProduct={Flashproduct} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Flashlist;
