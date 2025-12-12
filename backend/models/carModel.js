const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand : { type: String, required: true },
    rentPerDay: { type: Number, required: true },
    cetagory: { type: String, required: true },
    rating: { type: Number, default: 0 },
    imageURL: { type: String, default: '' },
    status: { type: String, enum: ['available', 'booked'], default: 'available' }


})
module.exports= mongoose.model('Car',carSchema);
