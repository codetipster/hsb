const express = require('express');
const router = express.Router();

const accountantController = require('../controllers/accountant.controller');

router.get('/profile', accountantController.profile);
router.get('/accountants', accountantController.getAccountants);
router.get('/accountants/:id', accountantController.getAccountantById);

module.exports = router;