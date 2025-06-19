import express from 'express';
import Listing from '../models/Listing.js';

const router = express.Router();

export const all= async (req, res) => {
    const listings = await Listing.find();
    res.json(listings);
};

export const specific = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.json(listing);
};

export const add = async (req, res) => {
  try {
    const file = req.files;
    if (!file || !req.files.image) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'wanderlust_listings', // Optional: organize your images in a specific folder
      resource_type: 'auto' // automatically detect if it's an image, video, etc.
    });
 
    const { title, description, location, price, host } = req.body;
    const newListing = Listing.create({
      title,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      }, 
      location,
      price,
      host, // Expects a User ObjectId
    });
    res.status(201).json(newListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default router;