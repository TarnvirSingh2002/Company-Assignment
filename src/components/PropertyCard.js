import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css'; // For basic styling

const PropertyCard = ({ listing }) => {
  return (
    <div className="property-card">
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.images[0] || 'https://via.placeholder.com/300'} alt={listing.title} className="property-image" />
        <div className="property-info">
          <h3>{listing.location}</h3>
          <p>{listing.title}</p>
          <p><strong>${listing.pricePerNight}</strong> per night</p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;