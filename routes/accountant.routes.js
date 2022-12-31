const express = require('express');
const router = express.Router();

const accountantController = require('../controllers/accountant.controller');

router.get('/', accountantController.getAccountants);
router.get('/:id', accountantController.getAccountantById);

module.exports = router;