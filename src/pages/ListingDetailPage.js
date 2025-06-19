import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api'; // Your API utility for making backend requests

export default function ListingDetailPage() {
    const { id } = useParams(); // Extracts the 'id' parameter from the URL (e.g., from /listing/123)
    const [listing, setListing] = useState(null); // State to store the fetched listing details
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to store any error messages during fetching

    // States for the booking form
    const [fromDate, setFromDate] = useState(''); // State for the check-in date
    const [toDate, setToDate] = useState('');     // State for the check-out date
    const [bookingMessage, setBookingMessage] = useState(''); // State for booking success/error messages
    const [bookingLoading, setBookingLoading] = useState(false); // State to manage booking submission loading

    // useEffect hook to fetch listing details when the component mounts or ID changes
    useEffect(() => {
        const fetchListing = async () => {
            try {
                // Make an API call to get a single listing by its ID
                const response = await api.get(`/listings/${id}`);
                setListing(response.data); // Update listing state with fetched data
                setLoading(false);         // Set loading to false
            } catch (err) {
                console.error('Error fetching listing details:', err);
                setError('Failed to load listing details. Please try again.'); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchListing(); // Call the fetch function
    }, [id]); // Dependency array: re-run this effect if the 'id' changes

    // Handler for booking form submission
    const handleBookingSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setBookingMessage(''); // Clear any previous booking messages
        setBookingLoading(true); // Set booking loading to true

        // Basic client-side date validation before sending to backend
        if (!fromDate || !toDate) {
            setBookingMessage('Please select both check-in and check-out dates.');
            setBookingLoading(false);
            return;
        }
        const checkIn = new Date(fromDate);
        const checkOut = new Date(toDate);
        if (checkOut <= checkIn) {
            setBookingMessage('Check-out date must be after check-in date.');
            setBookingLoading(false);
            return;
        }
        const today = new Date();
        today.setHours(0,0,0,0); // Normalize to start of day
        if(checkIn < today) {
            setBookingMessage('Check-in date cannot be in the past.');
            setBookingLoading(false);
            return;
        }

        try {
            // Make an API call to your backend's booking endpoint
            const response = await api.post('/bookings', {
                listing: id,       // Pass the listing ID (matches your Booking schema field 'listing')
                fromDate,          // Pass the selected check-in date (matches 'fromDate')
                toDate,            // Pass the selected check-out date (matches 'toDate')
            });
            // Display success message from backend
            setBookingMessage('Booking successful! ' + response.data.message);
            // Optionally, clear the date inputs after successful booking
            setFromDate('');
            setToDate('');
        } catch (err) {
            console.error('Booking error:', err.response ? err.response.data : err.message);
            // Display error message from backend or a generic one
            setBookingMessage(err.response?.data?.message || 'Failed to create booking. Please ensure you are logged in and dates are valid.');
        } finally {
            setBookingLoading(false); // Set booking loading to false
        }
    };

    // Render loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                <p className="ml-4 text-xl text-gray-700">Loading listing details...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-600 text-xl">
                {error}
            </div>
        );
    }

    // Render if listing is not found after loading
    if (!listing) {
        return <div className="text-center text-xl text-gray-600 py-20">Listing not found.</div>;
    }

    // Main component rendering
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6 md:p-8">
                {/* Image Display */}
                <div className="mb-8 relative w-full h-96 rounded-lg overflow-hidden">
                    <img
                        src={listing.image || 'https://placehold.co/800x600/D1D5DB/4B5563?text=No+Image'}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                    />
                    {/* If your schema supported multiple images, you'd implement a carousel here */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Listing Details Section */}
                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">{listing.title}</h1>
                        <p className="text-lg text-gray-600 mb-4 flex items-center">
                            {/* Location Icon */}
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                            {listing.location}
                        </p>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">
                            {listing.description}
                        </p>

                        {/* Host Information */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About the Host</h2>
                            {/* Assumes 'host' object is populated by backend and has 'username' and 'email' */}
                            <p className="text-gray-700">Hosted by: <span className="font-medium">{listing.host?.username || 'N/A'}</span></p>
                            <p className="text-gray-700 text-sm mt-2">Contact: <span className="font-medium">{listing.host?.email || 'N/A'}</span></p>
                            {/* Add more host details here if available in your User model and populated */}
                        </div>
                    </div>

                    {/* Booking Panel Section */}
                    <div className="md:col-span-1">
                        <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-blue-50">
                            <h2 className="text-3xl font-bold text-blue-700 mb-5 text-center">
                                ₹{listing.price} <span className="text-xl text-gray-600 font-normal">/ night</span>
                            </h2>

                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Check-in Date
                                    </label>
                                    <input
                                        type="date"
                                        id="fromDate"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Check-out Date
                                    </label>
                                    <input
                                        type="date"
                                        id="toDate"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* As per your Booking schema, there's no `totalPrice` or `status` field
                                    on the client-side for direct input. These would typically be handled
                                    on the backend based on `listing.price` and selected dates. */}

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={bookingLoading}
                                >
                                    {bookingLoading ? 'Booking...' : 'Book Now'}
                                </button>
                            </form>

                            {bookingMessage && (
                                <p className={`mt-4 text-center text-sm ${bookingMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                                    {bookingMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
