import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CouponComponent = ({ onApplyCoupon }) => {
    const [couponCode, setCouponCode] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCoupons`);
                setCoupons(response.data);  // Set available coupons
            } catch (err) {
                console.error('Error fetching coupons:', err);
            }
        };
        fetchCoupons();
    }, []);

    const applyCoupon = () => {
        const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());

        if (coupon) {
            setSuccess(`Coupon applied! You get ${coupon.discount}% off.`);
            setError('');
            onApplyCoupon(coupon.discount);  // Pass discount back to parent
        } else {
            setError('Invalid coupon code.');
            setSuccess('');
            onApplyCoupon(0);  // No discount
        }
    };

    return (
        <div className="CouponComponent">
            <div className="Cupponcodes flex gap-3 items-center">
                <div className="Cupponcodes flex gap-3 items-center">
                </div>
                <input
                    className='text-gray-600 border border-gray-700 xl:p-3 p-2 xl:w-[17vw] w-[50vw] rounded-sm'
                    type="text"
                    placeholder='Coupon Code'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                    className='xl:py-3 py-2 px-8  border bg-[#DB4444] text-white rounded-sm'
                    onClick={applyCoupon}
                >
                    Apply Coupon
                </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 text-lg mt-2">{success}</p>}
        </div>
    );
};

export default CouponComponent;
