import React, { useState, useRef } from 'react';
import './Wheel.css'; // Ensure this file exists and is correctly linked
import { FaRegCopy } from "react-icons/fa";

const Wheel = ({ segments, colors, onComplete, coupons }) => {
  const [spinning, setSpinning] = useState(false);
  const [winningSegment, setWinningSegment] = useState(null);
  const [winningCoupon, setWinningCoupon] = useState(null);
  const wheelRef = useRef(null);

  // Map discount percentages to coupon codes
  const couponMapping = {
    '1%': 'SAVEON1',
    '2%': 'DOUBLEUP2',
    '3%': 'THREEOFF',
    '7%': 'LUCKY7DEAL',
    '0%': 'BETTER_LUCK_NEXT_TIME',
    '10%': 'TENFORWIN',
    '6%': 'SIXBOOST',
    '30%': 'BIGTHIRTY'
  };

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const spinDeg = Math.floor(Math.random() * 360) + 360 * 5; // Spin 5 times plus random degrees
    wheelRef.current.style.transition = 'transform 4s ease-out';
    wheelRef.current.style.transform = `rotate(${spinDeg}deg)`;

    // Calculate the winning segment index
    const segmentCount = segments.length;
    const segmentDeg = 360 / segmentCount;
    const winningIndex = Math.floor(((spinDeg % 360) / segmentDeg + 0.5) % segmentCount);

    setTimeout(() => {
      setSpinning(false);
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = `rotate(${spinDeg % 360}deg)`;

      // Set the winning coupon code based on the segment
      const wonCoupon = couponMapping[(segments[winningIndex])];
      setWinningCoupon(wonCoupon);

      // Set the winning segment
      setWinningSegment(segments[winningIndex]);
     
      onComplete();

    }, 4000);

  };
  const copyToClipboard = () => {
    if (winningCoupon) {
      navigator.clipboard.writeText(winningCoupon);
      alert('Coupon code copied to clipboard!');
    }
  };

  return (
    <div className="wheel-container">
      <div className="wheel-wrapper">
        <div className={`wheel ${spinning ? 'spinning' : ''}`} ref={wheelRef} onClick={spinWheel} disabled={spinning}>
          {segments.map((segment, index) => (
            <div
              key={index}
              className="wheel-segment"
              style={{
                backgroundColor: colors[index % colors.length],
                transform: `rotate(${(360 / segments.length) * index}deg)`
              }}
            >
              <span>{segment}</span>
            </div>
          ))}
        </div>

      </div>
      <span>
        {spinning ? 'Spinning...' : 'Spin'}
      </span>
      {winningSegment && (
        <div className="result-message">
          <h2>Congratulations!</h2>
          {/* <p>You won: <strong>{winningSegment}</strong></p> */}
          <p className='flex flex-col'>
            <span> You won: <strong>{winningSegment}</strong> off!</span>
            <div className='flex gap-2 items-center  text-xl'> <span className=''>Your coupon code is:</span> <strong className='text-blue-600'>{winningCoupon}</strong>
              <div className="copy text-black">
                <FaRegCopy className='cursor-pointer' onClick={copyToClipboard} />
              </div>
            </div>
          </p>
        </div>
      )}
    </div>
  );
};

export default Wheel;
