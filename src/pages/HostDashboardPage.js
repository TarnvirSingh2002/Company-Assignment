import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api'; // Your API utility for making backend requests

export default function HostDashboardPage() {
    const [myListings, setMyListings] = useState([]); // State to store listings owned by the host
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to store any error messages
    const [deleteMessage, setDeleteMessage] = useState(''); // State for delete operation messages

    // useEffect hook to fetch the host's listings when the component mounts
    useEffect(() => {
        const fetchMyListings = async () => {
            setLoading(true);
            setError(null);
            try {
                
                const response = await api.get('/listings'); // Fetch all listings
                const allListings = response.data;

                // Simulate filtering by the current host's ID from JWT payload (e.g., req.user.id)
                // You would typically get this 'userId' from a global auth context or by decoding JWT
                // For this example, we'll assume the host's ID is available from the token payload.
                // In a production app, the backend would filter before sending.
                // Assuming `listing.host` (from your Listing schema) matches `req.user.id` on backend.
                // A more robust way would be to get user details including ID from a context provider.
                const token = localStorage.getItem('token');
                let currentUserId = null;
                if (token) {
                    // You'd need a library like 'jwt-decode' to get the ID from the client side
                    // import jwt_decode from 'jwt-decode';
                    // try {
                    //     const decodedToken = jwt_decode(token);
                    //     currentUserId = decodedToken.user.id; // Adjust based on your JWT structure
                    // } catch (decodeError) {
                    //     console.error("Failed to decode token for host dashboard:", decodeError);
                    //     // Handle invalid token, e.g., redirect to login
                    // }
                }

                // Temporary client-side filter (replace with backend filtered endpoint!)
                const filteredListings = allListings.filter(listing =>
                    listing.host && currentUserId && listing.host.toString() === currentUserId.toString()
                );

                setMyListings(filteredListings);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching host listings:', err.response ? err.response.data : err.message);
                setError('Failed to load your listings. Please ensure you are logged in as a host.');
                setLoading(false);
            }
        };

        fetchMyListings();
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Handler for deleting a listing
    const handleDeleteListing = async (listingId) => {
        if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
            return; // User cancelled
        }

        setDeleteMessage('');
        try {
            // API call to delete a listing
            await api.delete(`/listings/${listingId}`);
            // Remove the deleted listing from the state immediately to update UI
            setMyListings(myListings.filter(listing => listing._id !== listingId));
            setDeleteMessage('Listing deleted successfully!');
        } catch (err) {
            console.error('Error deleting listing:', err.response ? err.response.data : err.message);
            setDeleteMessage(err.response?.data?.message || 'Failed to delete listing. Please try again.');
        }
    };

    // Render loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                <p className="ml-4 text-xl text-gray-700">Loading your dashboard...</p>
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

    // Main component rendering
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                Host Dashboard
            </h1>

            {deleteMessage && (
                <div className={`my-4 p-3 rounded-md text-center ${deleteMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {deleteMessage}
                </div>
            )}

            <div className="flex justify-center mb-10">
                {/* Link to a page for creating a new listing */}
                <Link to="/host/listings/new" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105">
                    Create New Listing
                </Link>
            </div>

            {myListings.length === 0 ? (
                <div className="text-center text-gray-600 text-xl py-10">
                    You don't have any listings yet. Create one above!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myListings.map((listing) => (
                        <div key={listing._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transform transition duration-200 hover:shadow-xl">
                            <img
                                src={listing.image || 'https://placehold.co/400x240/D1D5DB/4B5563?text=No+Image'}
                                alt={listing.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{listing.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">{listing.location} - <span className="font-bold">₹{listing.price}</span>/night</p>
                                <div className="flex justify-end space-x-2">
                                    {/* Link to a page for editing an existing listing */}
                                    <Link to={`/host/listings/edit/${listing._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-300">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteListing(listing._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
