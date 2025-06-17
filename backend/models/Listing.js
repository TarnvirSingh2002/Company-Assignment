import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    location: String,
    price: Number,
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Listing', listingSchema);
