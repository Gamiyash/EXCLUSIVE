
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Allproducts from '../AllProducts/Allproducts'; // Component to display individual products
import Sidebar from './Sidebar';
import FilterComponent from './FilterComponet';

const ProductsPage = () => {
    const location = useLocation();
    const products = location.state?.products || [];
    const [filteredProducts, setFilteredProducts] = useState(products); // Get products from location state 

    const handleFilter = (filtered) => {
        setFilteredProducts(filtered);
    };
    
    return (
        <div>
            {products.length > 0 ? (
                <div className="product-list flex w-full gap-5">
                    <div className='fixed left-0 w-[21vw] h-screen '><Sidebar /></div>
                    <div className="ml-[21vw] flex-1 overflow-auto p-3 ">
                    <FilterComponent products={products} onFilter={handleFilter} />
                        <div className="flex flex-wrap justify-around items-start gap-2 mt-5">
                        {filteredProducts.map((product) => (
                                <Allproducts key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No products found</p>
            )}

        </div>
    );
};

export default ProductsPage;
