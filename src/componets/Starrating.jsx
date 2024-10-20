import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const stars = Array(5).fill(0).map((_, index) => {
        const starRating = index + 0.5;
        return (
            <span key={index}>
                {rating >= index + 1 ? (
                    <FaStar color="gold" />
                ) : rating >= starRating ? (
                    <FaStarHalfAlt color="gold" />
                ) : (
                    <FaRegStar color="gold" />
                )}
            </span>
        );
    });

    return <div className="flex">{stars}</div>;
};

export default StarRating;