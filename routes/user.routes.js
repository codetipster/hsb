const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");

//Create the limiter middleware: 5 login attempts within a 15-minute window. 
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts from this IP, please try again later.",
  });
  

const userController = require('../controllers/user.controller');

router.post('/login', loginLimiter, userController.login);
router.get('/notification/:id', userController.getNotifications);

module.exports = router;