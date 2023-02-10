const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

router.post('/signup', adminController.signup);
router.post('/create-accountant', adminController.createAccountant);
router.post('/create-client', adminController.createClient);
router.get('/profile', adminController.profile);
router.get('/statistics', adminController.statistics);

router.get('/invoices', adminController.getInvoices);
router.get('/reports', adminController.getReports);
router.get('/employees', adminController.getEmployees);


module.exports = router;