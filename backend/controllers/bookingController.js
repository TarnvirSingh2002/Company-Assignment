import Booking from '../models/Booking.js'; // .default for ES module import
import Listing  from'../models/Listing.js'; // Assuming Listing is also an ES module
import mongoose from 'mongoose'; // For ObjectId validation

export const createBooking = async (req, res) => {
    // Schema fields for Booking: listing, user, fromDate, toDate
    const { listing, fromDate, toDate } = req.body;
    const user = req.user.id; // User ID from authMiddleware (authenticated user making the booking)

    // Basic validation for required fields
    if (!listing || !fromDate || !toDate) {
        return res.status(400).json({ message: 'Please provide listing ID, from date, and to date.' });
    }

    // Validate listing ID format
    if (!mongoose.Types.ObjectId.isValid(listing)) {
        return res.status(400).json({ message: 'Invalid Listing ID format.' });
    }

    try {
        // Check if the listing actually exists using the provided Listing schema
        const foundListing = await Listing.findById(listing);
        if (!foundListing) {
            return res.status(404).json({ message: 'Listing not found.' });
        }

        // Convert dates to Date objects for validation
        const inDate = new Date(fromDate);
        const outDate = new Date(toDate);

        // Server-side date validation
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day for accurate comparison

        if (inDate < today) {
            return res.status(400).json({ message: 'From date cannot be in the past.' });
        }
        if (outDate <= inDate) {
            return res.status(400).json({ message: 'To date must be after From date.' });
        }

        const newBooking = new Booking({
            listing,     
            user,        
            fromDate: inDate, 
            toDate: outDate,   
        });

        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully.', booking: newBooking });

    } catch (error) {
        console.error('Error creating booking:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).send('Server error.');
    }
};


export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }) // Query by 'user' field in Booking schema
            .populate('listing', 'title location image price host') // Select specific fields from Listing to populate
            .sort({ createdAt: -1 }); // Sort by newest first

        res.json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).send('Server error.');
    }
};

export const getListingBookings = async (req, res) => {
    const { listingId } = req.params; // Route parameter for the listing
    const userId = req.user.id; // Host's ID from authMiddleware (authenticated user)

    // Validate listing ID format
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
        return res.status(400).json({ message: 'Invalid Listing ID format.' });
    }

    try {
        // Find the listing to check its existence and host
        const foundListing = await Listing.findById(listingId);

        if (!foundListing) {
            return res.status(404).json({ message: 'Listing not found.' });
        }

        if (foundListing.host.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to view bookings for this listing.' });
        }

        // Find bookings where the 'listing' field matches the listingId
        const bookings = await Booking.find({ listing: listingId }) // Query by 'listing' field in Booking schema
            .populate('user', 'username email') // Populate user details (who made the booking)
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (error) {
        console.error('Error fetching listing bookings:', error);
        if (error.name === 'CastError') { // Handle cases where listingId is not a valid ObjectId
            return res.status(400).json({ message: 'Invalid listing ID.' });
        }
        res.status(500).send('Server error.');
    }
};

export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;    
    const userRole = req.user.role; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Booking ID format.' });
    }

    try {
        let booking = await Booking.findById(id).populate('listing', 'host');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        if (userRole !== 'admin' &&
            booking.user.toString() !== userId && // Check if current user is the booker
            booking.listing.host.toString() !== userId) { // Check if current user is the host of the listing
            return res.status(403).json({ message: 'Not authorized to delete this booking.' });
        }

        await Booking.deleteOne({ _id: id }); // Mongoose 5+ method for deleting a single document

        res.json({ message: 'Booking deleted successfully.' });

    } catch (error) {
        console.error('Error deleting booking:', error);
        if (error.name === 'CastError') { // Handle cases where booking ID is not a valid ObjectId
            return res.status(400).json({ message: 'Invalid booking ID.' });
        }
        res.status(500).send('Server error.');
    }
};
