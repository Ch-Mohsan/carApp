const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true

    },
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    Cnic:{
        type: String,
        required: true
    },
    pickup:{
        type: String,
        required: true
    },
    dropoff:{
        type: String,
        required: true
    },
    startDate:{
     type: Date,
     required: true,
     default:Date.now()

    },
    endDate:{
        type: Date,
        required: true,
    
    },
    instructions:{
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    },
    fare:{
        type: Number,
        required: true
    },
    isDriver:{
        type: mongoose.Schema.Types.Boolean,
        ref: 'Driver',
        required: false,}
    
    ,
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
    }

   
);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;