import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './componets/Sidebar';
import Categories from './componets/Categories';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import { GiSmartphone } from 'react-icons/gi';
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsSmartwatch } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import { PiHeadphones } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import Flashslaes from './FlashProducts/Flashsales';
import ThisMonth from './ThisMonthBestProducts/ThisMonth';
import Allproducts from './AllProducts/Allproducts';
import { useNavigate, Link, redirect } from 'react-router-dom';


const Home = ({user}) => {

  const [Flashproducts, setFlashProducts] = useState([]);
  const [Bestproducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const endDate = localStorage.getItem('endDate');
    const now = new Date().getTime();
    const difference = endDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!localStorage.getItem('endDate')) {
      const endDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem('endDate', endDate);
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSalesRef = useRef(null);
  const categoriesRef = useRef(null);
  const ThismonthRef = useRef(null);
  const Allproductref = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };



  const categories = [
    // Your categories array
    {
      pic: <GiSmartphone size={65} style={{ strokeWidth: 0.1 }} />,
      title: 'Phones',
    },
    {
      pic: <HiOutlineDesktopComputer size={65} style={{ strokeWidth: 0.8 }} />,
      title: 'Computers',
    },
    {
      pic: <BsSmartwatch size={65} style={{ strokeWidth: 0.1 }} />,
      title: 'SmartWatch',
    },
    {
      pic: <CiCamera size={65} style={{ strokeWidth: 0.1 }} />,
      title: 'Camera',
    },
    {
      pic: <PiHeadphones size={65} style={{ strokeWidth: 0.1 }} />,
      title: 'Headphone',
    },
    {
      pic: <IoGameController size={65} style={{ strokeWidth: 0.1 }} />,
      title: 'Phones',
    },
  ];


  //FlashProducts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Flashproducts');
        setFlashProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //AllProducts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //ThisMonth Best Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Thismonth');
        setBestProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const RedirectToFlashsalePage = () => {
    navigate("/Flashproducts")
  }

  const RedirectToThisMonthBestproductsPage = () => {
    navigate("/Thismonth")
  }

  const RedirectToAlproductsPage = () => {
    navigate("/products")
  }

  

  if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>

      <div className="main bg-white">
        <div className="main">
          {/* <Navbar  /> */}
          <div className="Sidebar flex items-center gap-44">
            <Sidebar />
            <img width={900} className="mt-8" src="../Add.svg" alt="" />
          </div>
        </div>

        <div className="flex flex-col ml-[145px] mt-24 gap-9">
          {/* Flash sales */}
          {/* Flash Sales content */}

          <div className="flex items-center gap-3">
            <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
            <div className="today text-[#DB4444] font-bold">Today's</div>
          </div>

          <div className="sale-timer flex justify-between items-center">
            <div className="font-bold text-3xl flex gap-16 tracking-wider">
              <span>Flash Sales</span>
              <div>
                {timeLeft.days}d <span className="text-[#DB4444]">:</span> {timeLeft.hours}h{' '}
                <span className="text-[#DB4444]">:</span> {timeLeft.minutes}m{' '}
                <span className="text-[#DB4444]">:</span> {timeLeft.seconds}s
              </div>
            </div>
            <div className="two-arrow flex items-center gap-3 pr-24">
              <div className="left" onClick={() => scrollLeft(flashSalesRef)}>
                <FaArrowCircleLeft className="text-gray-400 text-2xl cursor-pointer" />
              </div>
              <div className="right" onClick={() => scrollRight(flashSalesRef)}>
                <FaArrowCircleRight className="text-gray-400 text-2xl cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Flash Sales Cards Section */}
          <div
            ref={flashSalesRef}
            className="cards flex items-center gap-5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', 'msOverflowStyle': 'none' }}
          >
            <div>
              {/* <Flashlist /> */}
              <div className="product-list flex gap-3 ">
                {Flashproducts.map(Flashproduct => (
                  <Flashslaes key={Flashproduct._id} FlashProduct={Flashproduct} user={user} />
                ))}
              </div>
            </div>
          </div>

          <div className="btn flex justify-center items-center pt-10 pb-5">
            <button onClick={RedirectToFlashsalePage} className="bg-[#DB4444] px-9 py-3 text-white">View All Products</button>
          </div>

          {/* Categories */}
          <div className="category flex items-center gap-3">
            <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
            <div className="today text-[#DB4444] font-bold">Categories</div>
          </div>

          <div className="sale-timer flex justify-between items-center">
            <div className="font-bold text-3xl flex gap-16 tracking-wider">
              <span>Browse By Category</span>
            </div>
            <div className="two-arrow flex items-center gap-3 pr-24">
              <div className="left" onClick={() => scrollLeft(categoriesRef)}>
                <FaArrowCircleLeft className="text-gray-400 text-2xl cursor-pointer" />
              </div>
              <div className="right" onClick={() => scrollRight(categoriesRef)}>
                <FaArrowCircleRight className="text-gray-400 text-2xl cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Categories Cards Section */}
          <div
            ref={categoriesRef}
            className="cards flex items-center gap-5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', 'msOverflowStyle': 'none' }}
          >
            {categories.map((category, index) => (
              <Categories key={index} category={category} />
            ))}
          </div>
          {/* This months */}
          <div className="category flex items-center gap-3">
            <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
            <div className="today text-[#DB4444] font-bold">This Month</div>
          </div>

          <div className="sale-timer flex justify-between items-center">
            <div className="font-bold text-3xl flex gap-16 tracking-wider">
              <span>Best Selling Products</span>
            </div>
            <div className="btn flex justify-center items-center  pr-24">
              <button onClick={RedirectToThisMonthBestproductsPage} className="bg-[#DB4444] px-5 py-3 text-white">View All Products</button>
            </div>
          </div>

          <div
            ref={ThismonthRef}
            className="cards flex items-center gap-5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', 'msOverflowStyle': 'none' }}
          >
            <div>
              <div className="product-list flex gap-3 ">
                {Bestproducts.map(ThismonthBestProduct => (
                  <ThisMonth key={ThismonthBestProduct._id} ThismonthBestProduct={ThismonthBestProduct} user={user} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="add2 flex justify-center items-center py-32">
          <img src="../Add2.svg" alt="" />
        </div>
        {/* All products */}
        <div className="allproducts flex flex-col ml-[145px] gap-9">

          <div className="category flex items-center gap-3">
            <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
            <div className="today text-[#DB4444] font-bold">Our Products</div>
          </div>
          <div className="sale-timer flex justify-between items-center">
            <div className="font-bold text-3xl flex gap-16 tracking-wider">
              <span>Explore Our Products</span>
            </div>
            <div className="two-arrow flex items-center gap-3 pr-24">
              <div className="left" onClick={() => scrollLeft(Allproductref)}>
                <FaArrowCircleLeft className="text-gray-400 text-2xl cursor-pointer" />
              </div>
              <div className="right" onClick={() => scrollRight(Allproductref)}>
                <FaArrowCircleRight className="text-gray-400 text-2xl cursor-pointer" />
              </div>
            </div>
          </div>
          <div
            ref={Allproductref}
            className="cards flex items-center gap-5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', 'msOverflowStyle': 'none' }} >
            <div>
              <div className="product-list flex gap-3 ">
                {products.map(product => (
                  <Allproducts key={product._id} product={product} user={user} />
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="btn flex justify-center items-center pt-10 pb-5">
          <button onClick={RedirectToAlproductsPage} className="bg-[#DB4444] px-9 py-3 text-white">View All Products</button>
        </div>

        <div className="services flex justify-center items-center py-20">
          <img src="../Service.svg" alt="" />
        </div>


      </div>
    </>
  );
};

export default Home;




