import React, { useState } from 'react';

const FilterComponent = ({ products, onFilter }) => {
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPriceOrder, setSelectedPriceOrder] = useState('');

    const applyFilters = (rating, order) => {
        let filteredProducts = [...products];

        if (rating) {
            filteredProducts = filteredProducts
                .filter(product => product.rating >= rating)
                .sort((a, b) => b.rating - a.rating); // Sort by rating from high to low
        }

        if (order === 'high-to-low') {
            filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
        } else if (order === 'low-to-high') {
            filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
        }

        onFilter(filteredProducts);
    };

    const handleRatingChange = (rating) => {
        const newRating = selectedRating === rating ? null : rating;
        setSelectedRating(newRating);
        applyFilters(newRating, selectedPriceOrder);
    };

    const handlePriceOrderChange = (order) => {
        const newOrder = selectedPriceOrder === order ? '' : order;
        setSelectedPriceOrder(newOrder);
        applyFilters(selectedRating, newOrder);
    };

    const getButtonStyle = (isActive) => {
        return isActive ? 'text-[#DB4444] font-medium border-b-2' : 'text-black';
    };

    return (
        <div className="filter-component flex justify-start items-center gap-6 mb-5 mt-3">
            <h4 className='text-lg font-medium from-stone-900'>Sort By :-</h4>
        <div className="filter-section flex gap-6">
            {/* <h4 className="text-lg font-semibold mb-2">Filter by Rating</h4> */}
            <button className={`border-[#DB4444] ${getButtonStyle(selectedRating === 0)}`} onClick={() => handleRatingChange(0)}>All Products</button>
            <button className={`border-[#DB4444] ${getButtonStyle(selectedRating === 0.5)}`} onClick={() => handleRatingChange(0.5)}>Popularity</button>
            {/* <button className={`hover:border-b-2 hover:text-[#DB4444] hover:font-medium border-[#DB4444] ${getButtonStyle(selectedRating === 3)}`} onClick={() => handleRatingChange(3)}>3 Stars & Up</button>
            <button className={`hover:border-b-2 hover:text-[#DB4444] hover:font-medium border-[#DB4444] ${getButtonStyle(selectedRating === 2)}`} onClick={() => handleRatingChange(2)}>2 Stars & Up</button> */}
      
       
            {/* <h4 className="text-lg font-semibold mb-2">Sort by Price</h4> */}
            <button className={`border-[#DB4444] ${getButtonStyle(selectedPriceOrder === 'low-to-high')}`} onClick={() => handlePriceOrderChange('low-to-high')}>Price--Low to High</button>
            <button className={`border-[#DB4444] ${getButtonStyle(selectedPriceOrder === 'high-to-low')}`} onClick={() => handlePriceOrderChange('high-to-low')}>Price--High to Low</button>
            </div>
    </div>

    );
};

export default FilterComponent;



