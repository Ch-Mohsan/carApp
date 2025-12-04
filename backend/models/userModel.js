const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: true },
    isDriver: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;