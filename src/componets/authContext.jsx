// // authContext.js
// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const { data } = await axios.get('/api/auth/session');
//         // const newdata = await data.json()
//         setUser(data.user);
//       } catch (error) {
//         setUser(null);
//       }
//     };
//     checkAuth();
//   }, []);

//   const login = async () => {
//     window.location.href = 'http://localhost:3000/api/auth/signin/google';
//   };

//   const logout = async () => {
//     await axios.get('http://localhost:3000/api/auth/signout');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// src/components/authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    // Check for existing session on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       // Optionally check token expiration here
  //       if (decodedToken) {
  //         setUser(JSON.parse(storedUser));
  //       } else {
  //         localStorage.removeItem('token');
  //       }
  //     } catch (e) {
  //       console.error('Token decoding failed:', e);
  //       localStorage.removeItem('token');
  //     }
  //   } else if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // // useEffect(() => {
  // //   const storedUser = localStorage.getItem('user');
  // //   const token = localStorage.getItem('token');
  // //   if (token) {
  // //     try {
  // //       const decodedToken = jwtDecode(token);
  // //       if (decodedToken.exp * 1000 > Date.now()) {
  // //         setUser(JSON.parse(storedUser));
  // //       } else {
  // //         localStorage.removeItem('token');
  // //         localStorage.removeItem('user');
  // //       }
  // //     } catch (e) {
  // //       console.error('Token decoding failed:', e);
  // //       localStorage.removeItem('token');
  // //       localStorage.removeItem('user');
  // //     }
  // //   }
  // //   else if (storedUser) {
  // //         setUser(JSON.parse(storedUser));
  // //       }
  // // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const storedUser = localStorage.getItem('user');

  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       if (decodedToken) {
  //         setUser(storedUser ? JSON.parse(storedUser) : null);
  //       } else {
  //         localStorage.removeItem('token');
  //       }
  //     } catch (e) {
  //       console.error('Token decoding failed:', e);
  //       localStorage.removeItem('token');
  //     }
  //   } else if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


