import React, { useState, useEffect } from 'react';
import { GiSmartphone } from 'react-icons/gi'; // Import the icon

const Categories = ({ category }) => {
    const [iconSize, setIconSize] = useState(65); // Default size for larger screens

    // Update the icon size based on the window size
    useEffect(() => {
        const updateIconSize = () => {
            // Adjust size based on the screen width
            if (window.innerWidth <= 640) { // Tailwind's 'sm' breakpoint
                setIconSize(40); // Smaller size for smaller screens
            } else {
                setIconSize(100); // Default size for larger screens
            }
        };

        // Initial size check
        updateIconSize();

        // Add event listener to check for window resize
        window.addEventListener('resize', updateIconSize);
        return () => window.removeEventListener('resize', updateIconSize); // Clean up on unmount
    }, []);

    return (
        <div className="category-card  hover:text-white bg-white border rounded-md border-gray-300 relative flex flex-col justify-center items-center hover:bg-[#DB4444]">
            {/* Use the dynamic icon size */}
            {React.cloneElement(category.pic, { size: iconSize, style: { strokeWidth: 0.1 } })}
            <span className="category-title text-center">{category.title}</span>
        </div>
    );
};

export default Categories;
