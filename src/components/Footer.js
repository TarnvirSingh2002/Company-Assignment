// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Using react-router-dom for navigation

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white p-6 mt-12 shadow-inner">
            <div className="container mx-auto text-center">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
                    {/* Links using react-router-dom's Link component */}
                    <Link to="/about" className="text-gray-300 hover:text-white transition duration-300 hover:underline">
                        About Us
                    </Link>
                    <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300 hover:underline">
                        Contact
                    </Link>
                    <Link to="/privacy" className="text-gray-300 hover:text-white transition duration-300 hover:underline">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-gray-300 hover:text-white transition duration-300 hover:underline">
                        Terms of Service
                    </Link>
                </div>
                <p className="text-gray-400 text-sm">
                    &copy; {currentYear} StayFinder. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                    Designed with ❤️ for your next stay.
                </p>
            </div>
        </footer>
    );
}
