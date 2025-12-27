const express = require('express');
const router = express.Router();
const carController = require('../controller/carcontroller');
const { isAurthenticated, isAdmin } = require('../middleware/middle_auth');
const upload = require('../middleware/uploadImage');

router.post('/add/car',isAurthenticated, isAdmin, upload.single('image'), carController.addCar);
router.get('/getall/cars', carController.getAllCars);
router.get('/getbyid/car/:id', carController.getCarByID);
// Allow updating image as well
router.put('/updatebyid/car/:id', isAurthenticated, isAdmin, upload.single('image'), carController.updateCarByID);
router.delete('/deletebyid/car/:id', isAurthenticated, isAdmin, carController.deleteCarByID);
module.exports = router;