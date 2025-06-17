import express  from('express');
const router =  express.Router();
import bookingController  from('../controllers/bookingController.js');
import authMiddleware  from('../middleware/authMiddleware'); // For protected routes

router.post('/', authMiddleware, bookingController.createBooking);

router.get('/my', authMiddleware, bookingController.getUserBookings);
router.get('/listing/:listingId', authMiddleware, bookingController.getListingBookings);

router.delete('/:id', authMiddleware, bookingController.deleteBooking);

export default router;