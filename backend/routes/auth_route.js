const express = require('express');
const router = express.Router();
const auth_controller = require('../controller/userController');
const middleware = require('../middleware/middle_auth');

router.post('/signup', auth_controller.signup);
router.post('/login',  auth_controller.login);
router.post('/logout', middleware.isAurthenticated, auth_controller.logout);
router.get('/getAll/users', middleware.isAurthenticated, middleware.isAdmin, auth_controller.getAllUsers);
router.get('/getbyid/users/:id', middleware.isAurthenticated, middleware.isAdmin, auth_controller.getUserBYID);
router.delete('/deletebyid/users/:id', middleware.isAurthenticated, middleware.isAdmin, auth_controller.deleteByID);
router.delete('/deleteall/users', middleware.isAurthenticated, middleware.isAdmin, auth_controller.deletAllUsers);
router.put('/updatebyid/users/:id', middleware.isAurthenticated, middleware.isAdmin, auth_controller.updateByID);


module.exports = router;