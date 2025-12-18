const Car=require('../models/carModel');
const Booking = require('../models/bookingModel');
const path = require('path');

const addCar= async(req,res,next)=>{
    try {
        const {name,brand,rentPerDay,cetagory,rating,status}= req.body;
        // Map uploaded file to imageURL if provided; else normalize provided imageURL
        let imageURL = '';
        if (req.file && req.file.filename) {
            imageURL = `/uploads/${req.file.filename}`;
        } else if (typeof req.body.imageURL === 'string') {
            const raw = req.body.imageURL;
            const normalized = raw.replace(/\\/g, '/');
            const pubIdx = normalized.toLowerCase().indexOf('/public/');
            imageURL = pubIdx !== -1 ? normalized.slice(pubIdx + '/public'.length) : normalized;
        }
        const newCar= new Car({
            name,
            brand,
            rentPerDay,
            cetagory,
            rating,
            imageURL,
            status
        });
        const savedCar= await newCar.save();
        res.status(201).json({message:'Car added successfully',car:savedCar});
    } catch (error) {
        next(error);
    }
}
const getAllCars= async(req,res,next)=>{
    try {
        // Compute active bookings (pending or confirmed) overlapping today
        const startOfToday = new Date(); startOfToday.setHours(0,0,0,0)
        const endOfToday = new Date(); endOfToday.setHours(23,59,59,999)
        const activeBookings = await Booking.find({
            status: { $in: ['confirmed', 'pending'] },
            startDate: { $lte: endOfToday },
            endDate: { $gte: startOfToday }
        }).select('carId').lean()
        const activeSet = new Set(activeBookings.map(b => String(b.carId)))
        console.log('[GET /api/cars/getall/cars] activeBookings(overlap today)=', activeBookings.length)
        const cars = await Car.find({})

        // Optionally persist any status drift
        const bulk = []
        for (const c of cars) {
            const shouldBe = activeSet.has(String(c._id)) ? 'booked' : 'available'
            if (c.status !== shouldBe) {
                bulk.push({ updateOne: { filter: { _id: c._id }, update: { $set: { status: shouldBe } } } })
                c.status = shouldBe
            }
            console.log('  car', String(c._id), c.name, 'status:', c.status, 'activeSet:', activeSet.has(String(c._id)))
        }
        if (bulk.length) await Car.bulkWrite(bulk)

        res.status(200).json({cars});
    } catch (error) {
        next(error);
    }
}
const getCarByID= async(req,res,next)=>{
    try {
        const carId=req.params.id;
        const car= await Car.findById(carId);
        if(!car){
            const err= new Error('Car not found');
            err.status=404;
            return next(err);
        }
        res.status(200).json({car});
    } catch (error) {
        next(error);
    }
}
const updateCarByID= async(req,res,next)=>{
    try {
        const carId=req.params.id;
        const updateData=req.body;
        const updatedCar= await Car.findByIdAndUpdate(carId,updateData,{new:true});
        if(!updatedCar){
            const err= new Error('Car not found');  
            err.status=404;
            return next(err);
        }   
        res.status(200).json({message:'Car updated successfully',car:updatedCar});
    } catch (error) {
        next(error);
    }
}
const deleteCarByID= async(req,res,next)=>{
    try {
        const carId=req.params.id;
        const deletedCar= await Car.findByIdAndDelete(carId);
        if(!deletedCar){
            const err= new Error('Car not found');
            err.status=404;
            return next(err);
        }
        res.status(200).json({message:'Car deleted successfully',car:deletedCar});
    } catch (error) {
        next(error);
    }
}

module.exports={addCar,getAllCars,getCarByID,updateCarByID,deleteCarByID};   
