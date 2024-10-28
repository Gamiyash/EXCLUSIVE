import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Allproducts from '../AllProducts/Allproducts';
import Sidebar from '../componets/Sidebar';
import Footer from '../componets/Footer';


const MensFashionproductsList = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("The user is", user)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
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
            <div className="product-list overflow-hidden xl:flex-row xl:justify-normal xl:items-start flex flex-col justify-center items-center gap-0 xl:gap-6">
                <div className='xl:fixed xl:left-0 xl:w-[21vw] xl:h-screen w-full overflow-x-auto pt-1 xl:pt-0'><Sidebar /></div>
                <div className="xl:ml-[14vw] flex-1 overflow-auto xl:p-3">
                    <div className="flex flex-wrap justify-around items-start xl:mt-5 mt-2 xl:pl-5 ">
                        {products.filter((product) => product.type == "ManFashion").map(product => (
                            <Allproducts key={product._id} product={product} user={user} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default MensFashionproductsList;