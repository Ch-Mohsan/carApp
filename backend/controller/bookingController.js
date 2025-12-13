const Booking = require('../models/bookingModel');

const createBooking = async (req, res, next) => {
    const {
        userId,
        userid,
        carId,
        carid,
        name,
        phone,
        Cnic,
        cnic,
        pickup,
        dropoff,
        startDate,
        endDate,
        instructions,
        fare,
        isDriver,
    } = req.body || {};

    const payload = {
        userId: (req.user && req.user.id) || userId || userid,
        carId: carId || carid || (req.params && (req.params.carId || req.params.id)),
        name,
        phone,
        Cnic: typeof Cnic !== 'undefined' ? Cnic : cnic,
        pickup,
        dropoff,
        startDate,
        endDate,
        instructions,
        fare,
        isDriver,
    };

    if (!payload.userId || !payload.carId) {
        const err = new Error('userId and carId are required');
        err.status = 400;
        return next(err);
    }

    try {
        const newBooking = new Booking(payload);
        const saved = await newBooking.save();
        return res.status(201).json(saved);
    } catch (error) {
        return next(error);
    }
};

const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find();  
        res.status(200).json(bookings);
    } catch (error) {
        return next(error);
    }
};
const getBookingById = async (req, res, next) => {
    const { id: bookingId } = req.params;
    try {
        const booking = await Booking
            .findById(bookingId);
        if (!booking) {
            const err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json(booking);
    } catch (error) {
        return next(error);
    }
};
const updateBookingStatus = async (req, res, next) => {
    const { id: bookingId } = req.params;
    const { status } = req.body;
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            const err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        booking.status = status;
        await booking.save();
        res.status(200).json(booking);
    }   catch (error) {
        return next(error);
    }
};
const deleteBookingById = async (req, res, next) => {
    const { id: bookingId } = req.params;
    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) {
            const err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        return next(error);
    }
};





module.exports = { createBooking, getAllBookings, getBookingById, updateBookingStatus, deleteBookingById };