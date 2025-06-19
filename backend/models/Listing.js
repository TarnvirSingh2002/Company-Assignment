import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    image:{
        public_id: {type: String},
        url: {type: String},
    },
    location: String,
    price: Number,
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Listing', listingSchema);
