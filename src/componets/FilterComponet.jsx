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
        <div className="filter-component flex justify-start items-center xl:gap-6 gap-2 mb-7  xl:ml-5">
            <h4 className='text-sm xl:text-lg font-medium from-stone-900'>Sort By :-</h4>
            <div className="filter-section flex items-center gap-3 xl:gap-6">

                <button className={`border-[#DB4444] text-[10px] xl:text-lg ${getButtonStyle(selectedRating === 0)}`} onClick={() => handleRatingChange(0)}>All Products</button>
                <button className={`border-[#DB4444] text-[10px] xl:text-lg ${getButtonStyle(selectedRating === 0.5)}`} onClick={() => handleRatingChange(0.5)}>Popularity</button>

                <button className={`border-[#DB4444] text-[10px] xl:text-lg ${getButtonStyle(selectedPriceOrder === 'low-to-high')}`} onClick={() => handlePriceOrderChange('low-to-high')}>Price--Low to High</button>
                <button className={`border-[#DB4444] text-[10px] xl:text-lg ${getButtonStyle(selectedPriceOrder === 'high-to-low')}`} onClick={() => handlePriceOrderChange('high-to-low')}>Price--High to Low</button>
            </div>
        </div>

    );
};

export default FilterComponent;



