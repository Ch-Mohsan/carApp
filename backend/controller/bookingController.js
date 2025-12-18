const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const Car = require('../models/carModel');

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
        // Mark the car as booked as soon as a booking is created (pending holds the car)
        try {
            await Car.findByIdAndUpdate(saved.carId, { status: 'booked' });
        } catch {}
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

// Return only bookings for the authenticated user
const getMyBookings = async (req, res, next) => {
    try {
        const uid = req.user && req.user.id
        if (!uid) {
            const err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }
        const bookings = await Booking.find({ userId: uid });
        return res.status(200).json(bookings);
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
    const { status, driverId } = req.body;
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            const err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        // Update allowed fields when provided
        if (typeof req.body.name !== 'undefined') booking.name = req.body.name
        if (typeof req.body.phone !== 'undefined') booking.phone = req.body.phone
        if (typeof req.body.pickup !== 'undefined') booking.pickup = req.body.pickup
        if (typeof req.body.dropoff !== 'undefined') booking.dropoff = req.body.dropoff
        if (typeof req.body.startDate !== 'undefined') booking.startDate = req.body.startDate
        if (typeof req.body.endDate !== 'undefined') booking.endDate = req.body.endDate
        if (typeof req.body.instructions !== 'undefined') booking.instructions = req.body.instructions
        if (typeof req.body.fare !== 'undefined') booking.fare = req.body.fare
        if (typeof status !== 'undefined') booking.status = status
        // If driverId provided, assign to booking and update availability
        if (driverId) {
            const driver = await User.findById(driverId);
            if (!driver || !driver.isDriver) {
                const err = new Error('Selected user is not a driver');
                err.status = 400;
                return next(err);
            }
            booking.driverId = driverId;
            // Mark driver unavailable when confirming
            if (status === 'confirmed' && driver.isAvailable) {
                driver.isAvailable = false;
                await driver.save();
            }
        }
        // If cancelling a booking that had a driver, free them
        if (status === 'cancelled' && booking.driverId) {
            const d = await User.findById(booking.driverId);
            if (d && d.isDriver) {
                d.isAvailable = true;
                await d.save();
            }
        }
        // Sync car status based on booking state
        if (status === 'confirmed') {
            // mark car booked
            await Car.findByIdAndUpdate(booking.carId, { status: 'booked' }).catch(() => {})
        } else if (status === 'cancelled') {
            // release car if there is no other active booking (pending or confirmed) for this car
            const now = new Date()
            const active = await Booking.find({ carId: booking.carId, status: { $in: ['confirmed','pending'] }, endDate: { $gte: now } }).limit(1)
            if (!active || active.length === 0) {
                await Car.findByIdAndUpdate(booking.carId, { status: 'available' }).catch(() => {})
            }
        }
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
        // If the deleted booking was still active, release the car when no other active booking remains
        const now = new Date()
        if (booking.endDate && new Date(booking.endDate) >= now) {
            const active = await Booking.find({ carId: booking.carId, status: { $in: ['confirmed','pending'] }, endDate: { $gte: now } }).limit(1)
            if (!active || active.length === 0) {
                await Car.findByIdAndUpdate(booking.carId, { status: 'available' }).catch(() => {})
            }
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        return next(error);
    }
};





module.exports = { createBooking, getAllBookings, getMyBookings, getBookingById, updateBookingStatus, deleteBookingById };