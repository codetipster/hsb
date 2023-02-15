const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/login', userController.login);
router.get('/notification/:id', userController.getNotifications);

module.exports = router;