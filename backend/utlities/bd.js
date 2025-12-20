const mongoose = require('mongoose');
const uri= process.env.Db_uri;

const connectDB = async () => { 
    try {
        await mongoose.connect(uri, {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;