const bookingController = require('../controller/bookingController');
const express = require('express');
const { isAurthenticated, isAdmin } = require('../middleware/middle_auth');
const zodValidator = require('../middleware/zod_middleweare');
const { bookingSchema } = require('../validators/booking_validator');
const router=express.Router();

router.post('/add', isAurthenticated, zodValidator(bookingSchema), bookingController.createBooking);
router.get('/getall',isAurthenticated,isAdmin,bookingController.getAllBookings);
router.get('/getById/:id', isAurthenticated, bookingController.getBookingById);
router.put('/updateById/:id', isAurthenticated, isAdmin, bookingController.updateBookingStatus);
router.delete('/deleteById/:id', isAurthenticated, isAdmin, bookingController.deleteBookingById);

module.exports=router;  