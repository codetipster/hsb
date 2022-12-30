const express = require('express');
const router = express.Router();

const accountantController = require('../controllers/accountant.controller');

router.post('/signup', accountantController.signup);

module.exports = router;