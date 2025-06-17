import express from 'express';
import Listing from '../models/Listing';

const router = express.Router();

export const all= async (req, res) => {
    const listings = await Listing.find();
    res.json(listings);
};

export const specific = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.json(listing);
};

export default router;