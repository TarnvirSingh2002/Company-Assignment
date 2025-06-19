// // src/components/common/Navbar.jsx
// import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Using react-router-dom for navigation
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
export default function Navbar() {
    
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
    const handleLogout = () => {
        localStorage.removeItem('token');
            setIsLoggedIn(false); // 🔁 Update the App state
            navigate('/auth/login');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/Home Link */}
                {/* 'Link' component from react-router-dom */}
                <Link to="/" className="flex items-center space-x-2 text-white text-2xl font-bold rounded-md px-3 py-2 transition duration-300 hover:bg-blue-700">
                    StayFinder
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/listings" className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105">
                        Listings
                    </Link>

                    {/* Conditional rendering based on authentication status */}
                    {!isLoggedIn ? (
                        <>
                            <Link to="/auth/login" onClick={()=>{navigate('/login')}}className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105">
                                Login
                            </Link>
                            <Link to="/auth/register" onClick={()=>{navigate('/register')}}className="bg-white text-blue-700 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Example: Conditional Host Dashboard link */}
                            {/* Uncomment and adjust logic if you implement user roles */}
                            {/* {userRole === 'host' && ( */}
                                <Link to="/host/dashboard" className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105">
                                    Host Dashboard
                                </Link>
                            {/* )} */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}