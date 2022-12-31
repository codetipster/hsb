const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

router.post('/signup', adminController.signup);
router.post('/create-accountant', adminController.createAccountant);
router.post('/create-client', adminController.createClient);

module.exports = router;