const bookingController = require('../controller/bookingController');
const express = require('express');
const { isAurthenticated, isAdmin } = require('../middleware/middle_auth');
const zodValidator = require('../middleware/zod_middleweare');
const { bookingSchema } = require('../validators/booking_validator');
const router=express.Router();

router.post('/add', isAurthenticated, zodValidator(bookingSchema), bookingController.createBooking);
// Admin-only: get all bookings
router.get('/getall', isAurthenticated, isAdmin, bookingController.getAllBookings);
// Authenticated user: get only own bookings
router.get('/mine', isAurthenticated, bookingController.getMyBookings);
// Authenticated driver: get bookings assigned to them
router.get('/assigned/me', isAurthenticated, bookingController.getAssignedToDriver);
router.get('/getById/:id', isAurthenticated, bookingController.getBookingById);
router.put('/updateById/:id', isAurthenticated, isAdmin, bookingController.updateBookingStatus);
// Driver reject without admin
router.put('/reject/:id', isAurthenticated, bookingController.driverRejectBooking);
router.delete('/deleteById/:id', isAurthenticated,  bookingController.deleteBookingById);

module.exports=router;  