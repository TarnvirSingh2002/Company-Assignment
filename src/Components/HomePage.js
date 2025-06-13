import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/listings").then((res) => {
      setListings(res.data);
    });
  }, []);

  return (
    <div>
      <h1>StayFinder Listings</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {listings.map((listing) => (
          <Link to={`/listing/${listing._id}`} key={listing._id}>
            <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
              <img src={listing.image} alt="listing" style={{ width: 200 }} />
              <h3>{listing.location}</h3>
              <p>${listing.price} / night</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;