import React from 'react'
import { useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { LuPackage } from "react-icons/lu";
import { BiMap } from "react-icons/bi";
import { GoCreditCard } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import Footer from '../componets/Footer';

import axios from 'axios';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const [profileImage, setProfileImage] = useState('');

  // const [file, setFile] = useState(null);
  const email = JSON.parse(localStorage.getItem('user'))?.email;

  // Fetch the user's profile image on load
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getProfile?email=${email}`);
      setProfileImage(response.data.profileImage);
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload the selected profile picture
  const updateProfileImage = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('profilePicture', selectedFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/updateProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      setProfileImage(response.data.profileImage);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };


  const handleBillingChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitBillingDetails = async () => {
    try {
      const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
      await axios.post(`${import.meta.env.VITE_API_URL}/api/saveUsersBillingDetails`, {
        email: userEmail,
        ...billingDetails,
      });
      alert('Profile details saved successfully');
    } catch (error) {
      console.error('Error saving billing details:', error);
      alert('Failed to save profile details');
    }
  };

  useEffect(() => {
    const FetchUserBillingDetails = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getUsersBillingDetails/${userEmail}`);
        setBillingDetails(response.data);
      } catch (err) {
        console.error('Error fetching billing details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    FetchUserBillingDetails();
  }, []);

  const handleChangepss = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
      const responce = await axios.post(`${import.meta.env.VITE_API_URL}/api/change-password/${userEmail}`, {
        currentPassword,
        newPassword,
      })

      alert(responce.data.message);
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
    }
  }

  if (loading) return <p className='flex justify-center items-center text-2xl'>Loading...</p>;
  // if (errors) return <p className='m-20'>Error: {errors}</p>;
  return (
    <>
      <main>
        <div className="heading flex justify-between items-center mt-5 lg:mx-8 sm:mx-10 mx-2  md:mx-10 xl:mx-16">
          <h1 className='text-2xl xl:text-2xl font-medium  text-[#DB4444]'>Your Profile</h1>
          <p className='text-lg xl:text-xl'>Welcome <span className='text-[#DB4444]'>{billingDetails.firstName}</span></p>
        </div>
        <div className="Container_of_Both_sectio flex flex-col xl:flex-row  justify-center items-center">
          <section className="sec-1 shadow-xl border border-gray-300 rounded-xl w-[95vw] xl:w-[30vw] h-[45vh] xl:h-[85vh] my-10 mx-7 flex flex-col gap-10 justify-center items-center">
            <div className="container1 flex flex-col items-center gap-3">
              <div className="profile-uploader flex flex-col gap-3 items-center justify-center">
                {profileImage ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}${profileImage}`}
                    alt=""
                    className="xl:w-32 xl:h-32 w-44 h-44 rounded-full object-cover"
                  />
                ) : (
                  <p>No profile image available</p>
                )}

                {/* Hidden file input */}
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {/* Custom file upload button */}
                <label
                  htmlFor="file-input"
                  className="cursor-pointer text-[14px] bg-[#DB4444] text-white px-4 py-2 xl:px-2 xl:py-2 rounded-full hover:bg-red-500 transition duration-300"
                >
                  Upload Image
                </label>

                {/* Submit Button */}
                <button
                  className="bg-green-500 text-[14px] text-white px-4 py-2 xl:px-2 xl:py-2 rounded-full  hover:bg-green-600 transition duration-300"
                  onClick={updateProfileImage}
                >
                  Update Profile Image
                </button>
              </div>
              <div className="Details flex flex-col items-center gap-1">
                <p className='text-2xl font-medium'>{billingDetails.firstName}</p>
                <p className='text-gray-500 '>{billingDetails.emailAddress}</p>
              </div>
            </div>

            <div className="All-btn flex items-center gap-10 xl:gap-7 bg-gray-200 px-2 xl:px-10 py-2 rounded-full">
              <div className="profile hover:bg-[#DB4444] hover:text-white rounded-full p-1">
                <CgProfile size={23} />
              </div>
              <div className="profile hover:bg-[#DB4444] hover:text-white rounded-full p-1" onClick={() => alert("Feture is Comming Soon")} >
                < LuPackage size={23} />
              </div>
              <div className="profile hover:bg-[#DB4444] hover:text-white rounded-full p-1" onClick={() => alert("Feture is Comming Soon")}>
                <BiMap size={23} />
              </div>
              <div className="profile hover:bg-[#DB4444] hover:text-white rounded-full p-1" onClick={() => alert("Feture is Comming Soon")}>
                <GoCreditCard size={23} />
              </div>

              <div className="profile hover:bg-[#DB4444] hover:text-white rounded-full p-1" onClick={() => alert("Feture is Comming Soon")}>
                <IoSettingsOutline size={23} />
              </div>
            </div>
          </section>

          <section className="sec-2 shadow-xl border border-gray-300 rounded-xl w-[98vw] xl:w-[60vw] h-[45vh] xl:h-[85vh] my-10 mx-4">
            <div className="EditProfile flex flex-col px-10 py-3">
              <h2 className='text-2xl font-medium  text-[#DB4444]'>Edit Your Profile</h2>

              <div className="input1 w-full flex gap-4 pt-5">
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-sm' htmlFor="FirstName ">First Name</label>
                  <input className='bg-gray-100 text-sm h-9 rounded-md px-3 w-[40vw] xl:w-[27vw]' type="text" name="firstName" value={billingDetails.firstName} onChange={handleBillingChange} />
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-sm' htmlFor="FirstName ">Last Name</label>
                  <input className='bg-gray-100 text-sm h-9 rounded-md px-3 w-[40vw] xl:w-[27vw]' type="text" name="companyName" value={billingDetails.companyName} onChange={handleBillingChange} />
                </div>
              </div>
              <div className="input2 w-full flex gap-4 pt-5">
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-sm' htmlFor="FirstName ">Email</label>
                  <input className='bg-gray-100 text-sm h-9 rounded-md px-3 w-[40vw] xl:w-[27vw]' name="emailAddress" value={billingDetails.emailAddress} onChange={handleBillingChange} />
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-sm' htmlFor="FirstName ">Address</label>
                  <input className='bg-gray-100 text-sm h-9 rounded-md px-3 w-[40vw] xl:w-[27vw]' type="text" name="streetAddress" value={`${billingDetails.streetAddress}, ${billingDetails.apartment || ''}, ${billingDetails.city}`} onChange={handleBillingChange} />
                </div>
              </div>


              <div className="PasswordChanges flex flex-col gap-2 pt-5">
                <h2 className='text-lg font-medium '>Password Changes</h2>

                <div className="inputs w-full flex flex-col gap-2 ">
                  <div className='flex flex-col gap-1'>
                    <input className='bg-gray-100 text-sm h-9 rounded-md px-3 w-full' placeholder='Current Password' type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} name="firstName" />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <input className='bg-gray-100 text-sm h-9 rounded-md px-3 w-full' placeholder='New Password' type="password" name="firstName"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <input className='bg-gray-100 text-sm h-9 rounded-md px-3 w-full' placeholder=' Confirm New Password' type="password" name="firstName" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                  <div className="btn">
                  <button onClick={handleChangepss}>Change Password</button>
                  </div>
                </div>

                <div className="btn pt-3">
                  <button className='p-2 text-sm px-4 border bg-[#DB4444] text-white rounded-sm' onClick={handleSubmitBillingDetails}>Save Changes</button>
                </div>
              </div>
            </div>
          </section>
        </div >
        <Footer/>
      </main >
    </>
  )
}

export default Profile
