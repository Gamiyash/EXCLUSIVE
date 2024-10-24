import React, { useState, useEffect } from 'react';
import Home from "./Home"
import Login from "./assets/Auth/Login";
import Signup from "./assets/Auth/Signup";
import Navbar from './componets/Navbar';
import Profile from './UserProfile/Profile';
import HistoryPage from './UserProfile/HistoryPage';
import OrderHistoryDetails from './UserProfile/OrderHistoryDetails';
import OtpVerification from './assets/Auth/OtpVerification';
import { AuthProvider } from './componets/authContext';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './AllProducts/ProductList';
import Flashlist from './FlashProducts/Flashlist';
import ThismonthList from './ThisMonthBestProducts/ThismonthList';
import WomenFashionproductsList from './CategoriesPages/WomenFashionProductsList';
import MensFashionproductsList from './CategoriesPages/MensFashionProductList';
import FlashProductDetails from './ProductDetails/FlashProductDetails';
import AllProductDetails from './ProductDetails/Allproductdetails';
import ThisMonthBestProductsDetails from './ProductDetails/ThisMonthBestproducts';
import Cart from './cart/Cart';
import Footer from './componets/Footer';
import WishList from './WishList/WishList';
import ProductsPage from './componets/SearchProducts';
import ElectronicsproductsList from './CategoriesPages/Electronics';
import Checkout from './Checkout/Checkout';
import EcommerceAdminDashboard from './Admin/Dashboard';
import Orders from './Admin/Orders';
import ContactPage from './Pages/ContactUs';
import AboutUsPage from './Pages/AboutUs';
import Bottom_nav from './componets/Bottom_nav';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));  // Set user from localStorage
        } else {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/session`, { withCredentials: true });
          const contentType = response.headers['content-type'];
          if (contentType && contentType.includes('application/json')) {
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Update localStorage
          } else {
            throw new Error('Unexpected response type');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
        localStorage.removeItem('user'); // Clear localStorage if the user is not authenticated
      }
    };
    checkAuth();
  }, []);


  return (
    <>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
                <Navbar user={user} setUser={setUser} />
              </div>

              <div className="pt-20">
                <Routes>
                  <Route path="/" element={<Home user={user} setUser={setUser} />} />
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/products" element={<ProductList user={user} setUser={setUser} />} />
                  <Route path="/Flashproducts" element={<Flashlist user={user} setUser={setUser} />} />
                  <Route path="/WomenFashionproducts" element={<WomenFashionproductsList user={user} setUser={setUser} />} />
                  <Route path="/MensFashionproducts" element={<MensFashionproductsList user={user} setUser={setUser} />} />
                  <Route path="/Electronics" element={<ElectronicsproductsList user={user} setUser={setUser} />} />
                  <Route path="/Thismonth" element={<ThismonthList user={user} setUser={setUser} />} />
                  <Route path="/Flashproductdetails/:id" element={<FlashProductDetails user={user} setUser={setUser} />} />
                  <Route path="/Allproductdetails/:id" element={<AllProductDetails user={user} setUser={setUser} />} />
                  <Route path="/ThismonthBestProductDetails/:id" element={<ThisMonthBestProductsDetails user={user} setUser={setUser} />} />
                  <Route path="/Login" element={<Login user={user} setUser={setUser} />} />
                  <Route path="/verify-otp" element={<OtpVerification setUser={setUser} />} />
                  <Route path="/Cart" element={<Cart user={user} setUser={setUser} />} />
                  <Route path="/Checkout" element={<Checkout user={user} setUser={setUser} />} />
                  <Route path="/WishList" element={<WishList user={user} setUser={setUser} />} />
                  <Route path="/searchproducts" element={<ProductsPage />} />
                  {/* <Route path="/ProctedComponet" element={<ProtectedComponent user={user} setUser={setUser} />} /> */}
                  <Route path="/orderHistory" element={<HistoryPage />} />
                  <Route path="/orderHistoryDetails/:orderId" element={<OrderHistoryDetails />} />

                  {/* Other routes */}
                  <Route path="/admin-dashboard" element={<EcommerceAdminDashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/Bottom_nav" element={<Bottom_nav />} />

                  <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                  <Route path="/" element={<Navigate to="/Signup" />} />
                  <Route path="/" element={<Navigate to="/Profile" />} />
                  <Route path="/Signup" element={<Navigate to="/Login" />} />
                  <Route path="/Login" element={<Navigate to="/verify-otp" />} />
                  <Route path="/Login" element={<Navigate to="/" />} />
                  <Route path="/" element={<Navigate to="/Cart" />} />
                  <Route path="/Cart" element={<Navigate to="/Checkout" />} />

                </Routes>
              </div>
            </div>
            <div>
              <Bottom_nav />
            </div>
          </div>
        </Router>
      </AuthProvider>

    </>
  )
}

export default App
