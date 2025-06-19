import express  from'express';
const router =  express.Router();
import { createBooking, deleteBooking, getListingBookings, getUserBookings }  from'../controllers/bookingController.js';
import authMiddleware  from'../middleware/authMiddleware.js'; // For protected routes

router.post('/', authMiddleware, createBooking);

router.get('/my', authMiddleware, getUserBookings);
router.get('/listing/:listingId', authMiddleware, getListingBookings);

router.delete('/:id', authMiddleware, deleteBooking);

export default router;