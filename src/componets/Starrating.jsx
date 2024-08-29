// import React from 'react';

// const StarRating = ({ rating }) => {
//   const maxStars = 5; // Maximum number of stars

//   // Round rating to nearest 0.5 for half-star display
//   const roundedRating = Math.round(rating * 2) / 2;
//   const filledStars = Math.min(Math.max(roundedRating, 0), maxStars); // Clamp rating between 0 and maxStars

//   return (
//     <div className="flex items-center">
//       {[...Array(maxStars)].map((_, index) => (
//         <svg
//           key={index}
//           xmlns="http://www.w3.org/2000/svg"
//           className={`h-6 w-6 ${index < filledStars ? 'text-yellow-500' : 'text-gray-300'}`}
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           {index < filledStars ? (
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M10 1l2.5 6.5H18l-5 3.8 2.5 6.7-6-4.6-6 4.6 2.5-6.7-5-3.8h5.5L10 1z"
//             />
//           ) : (
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M10 1l2.5 6.5H18l-5 3.8 2.5 6.7-6-4.6-6 4.6 2.5-6.7-5-3.8h5.5L10 1z"
//               fillOpacity="0"
//             />
//           )}
//         </svg>
//       ))}
//     </div>
//   );
// };

// export default StarRating;
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