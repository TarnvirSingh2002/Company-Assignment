import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import './HomePage.css'; // For basic styling

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/listings`);
        setListings(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) return <div>Loading listings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="homepage">
      <h1>Discover Your Next Stay</h1>
      <div className="listings-grid">
        {listings.map(listing => (
          <PropertyCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;