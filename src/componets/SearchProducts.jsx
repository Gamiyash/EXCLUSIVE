
import React from 'react';
import { useLocation } from 'react-router-dom';
import Allproducts from '../AllProducts/Allproducts'; // Component to display individual products
import Sidebar from './Sidebar';
const ProductsPage = () => {
    const location = useLocation();
    const products = location.state?.products || []; // Get products from location state

    return (
        <div>
            {products.length > 0 ? (
                <div className="product-list flex w-full gap-5">
                    <div className='fixed left-0 w-[21vw] h-screen '><Sidebar /></div>
                    <div className="ml-[21vw] flex-1 overflow-auto p-3 ">
                        <div className="flex flex-wrap justify-around items-start gap-2 mt-5">
                            {products.map((product) => (
                                <Allproducts key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No products found</p>
            )}

        </div>
        //       <div className="product-list flex w-full gap-5">
        //       <div className='fixed left-0 w-[21vw] h-screen '><Sidebar /></div>
        //       <div className="ml-[21vw] flex-1 overflow-auto p-3 ">
        //           <div className="flex flex-wrap justify-around items-start gap-2 mt-5">
        //               {products.map(product => (
        //                   <Allproducts key={product._id} product={product} user={user}  />
        //               ))}
        //                {/* {products.filter((product)=>product.type=="watch").map(product => (
        //                   <Allproducts key={product._id} product={product} user={user} />
        //               ))} */}
        //           </div>
        //       </div>
        //   </div>


    );
};

export default ProductsPage;
