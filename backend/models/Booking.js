import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fromDate: Date,
    toDate: Date
});

export default mongoose.model('Booking', bookingSchema);
