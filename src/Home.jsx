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
import Footer from './componets/Footer';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"

const Home = ({ user }) => {

  const [Flashproducts, setFlashProducts] = useState([]);
  const [Bestproducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [CurrentImageIndex, setCurrentImageIndex] = useState(0)

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

  const scrollLeftCategory = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRightCategory = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  const categories = [
    // Your categories array
    {
      pic: <GiSmartphone />,
      title: 'Phones',
    },
    {
      pic: <HiOutlineDesktopComputer />,
      title: 'Computers',
    },
    {
      pic: <BsSmartwatch />,
      title: 'SmartWatch',
    },
    {
      pic: <CiCamera />,
      title: 'Camera',
    },
    {
      pic: <PiHeadphones />,
      title: 'Headphone',
    },
    {
      pic: <IoGameController />,
      title: 'Phones',
    },
  ];


  //FlashProducts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/Flashproducts');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/Flashproducts`);
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
        // const response = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/products');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
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
        // const response = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/Thismonth');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/Thismonth`);
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

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const images = ["../Add.svg", " https://t3.ftcdn.net/jpg/06/00/42/04/240_F_600420453_vXQljuznZhAMwhf7a1vZdKWlBUDSdQMJ.jpg", " https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465248_FiKUDwScNZ1N5OoVncuiabtKsJqfWSWj.webp"]


  if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* <div className="relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          className="object-cover w-full h-full"
        />
        <button
          onClick={handlePreviousImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <FaChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <FaChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div> */}

      <div className="main bg-white">
        <div className="main">
          <div className="Sidebar relative flex flex-col items-center xl:flex-row xl:items-start xl:justify-between">
            <Sidebar />
            <img
              className="mt-4 xl:mt-[3%] xl:mr-[10%] w-[95%] xl:w-[60%] xl:h-[50%]"
              src={images[CurrentImageIndex]}
              alt=""
            />
            <button
              onClick={handlePreviousImage}
              className="absolute xl:left-[30%] left-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
            >
              <FaChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute xl:right-[10%] right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
            >
              <FaChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        <div className="flex flex-col ml-[5%] xl:ml-[10%] mt-24 gap-5 xl:gap-9">
          {/* Flash sales */}
          {/* Flash Sales content */}

          <div className="flex items-center gap-3">
            <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
            <div className="today text-[#DB4444] font-bold">Today's</div>
          </div>

          <div className="sale-timer flex justify-between px-3 items-center">
            <div className="font-bold text-xl xl:text-2xl flex xl:gap-16 gap-5 tracking-wider">
              <span>Flash Sales</span>
              <div>
                {timeLeft.days}d <span className="text-[#DB4444]">:</span> {timeLeft.hours}h{' '}
                <span className="text-[#DB4444]">:</span> {timeLeft.minutes}m{' '}
                <span className="text-[#DB4444]">:</span> {timeLeft.seconds}s
              </div>
            </div>
            <div className="two-arrow flex items-center gap-3  xl:pr-24">
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

          <div className="btn flex justify-center items-center xl:pt-10  xl:pb-5">
            <button onClick={RedirectToFlashsalePage} className="bg-[#DB4444] px-3 xl:px-5 xl:text-[14px] text-[10px] py-2 xl:py-3 text-white">View All Products</button>
          </div>

          {/* Categories */}
          <div className="category flex items-center gap-3">
            <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
            <div className="today text-[#DB4444] font-bold">Categories</div>
          </div>

          <div className="sale-timer flex justify-between items-center">
            <div className="font-bold flex text-xl xl:text-2xl xl:gap-16 gap-5 tracking-wider">
              <span>Browse By Category</span>
            </div>
            <div className="two-arrow flex items-center gap-3 pr-24">
              <div className="left" onClick={() => scrollLeftCategory}>
                <FaArrowCircleLeft className="text-gray-400 text-2xl cursor-pointer" />
              </div>
              <div className="right" onClick={() => scrollRightCategory}>
                <FaArrowCircleRight className="text-gray-400 text-2xl cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Categories Cards Section */}
          <div
            ref={categoriesRef}
            className="cards flex items-center xl:gap-5 overflow-x-auto"
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

          <div className="sale-timer flex justify-between px-3 items-center">
            <div className="font-bold text-xl xl:text-2xl flex gap-16 tracking-wider">
              <span>Best Selling Products</span>
            </div>
            <div className="btn flex justify-center items-center">
              <button onClick={RedirectToThisMonthBestproductsPage} className="bg-[#DB4444] px-3 xl:px-5 py-2 xl:py-3 xl:text-[14px] text-[10px] text-white">View All Products</button>
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
        <div className="allproducts flex flex-col ml-[5%] xl:ml-[10%] gap-5 xl:gap-9">

          <div className="category flex items-center gap-3">
            <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
            <div className="today text-[#DB4444] font-bold">Our Products</div>
          </div>
          <div className="sale-timer flex justify-between items-center">
            <div className="font-bold  flex text-xl xl:text-2xl  xl:gap-16 gap-5 tracking-wider">
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
              <div className="product-list flex gap-3">
                {products.map(product => (
                  <Allproducts key={product._id} product={product} user={user} />
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="btn flex justify-center items-center xl:pt-10 xl:pb-5">
          <button onClick={RedirectToAlproductsPage} className="bg-[#DB4444] px-3 xl:px-5 py-2 xl:py-3 xl:text-[14px] text-[10px] text-white">View All Products</button>
        </div>

        <div className="services flex justify-center items-center py-20">
          <img src="../Service.svg" alt="" />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;




