const express = require('express');
const router = express.Router();

const accountantController = require('../controllers/accountant.controller');

router.get('/profile', accountantController.profile);
router.get('/accountants', accountantController.getAccountants);
router.get('/accountants/:id', accountantController.getAccountantById);

router.get('/clients', accountantController.getClients);
router.get('/invoices', accountantController.getInvoices);
router.put('/invoices/:id', accountantController.updateInvoice);
router.post('/reports', accountantController.createReport);

module.exports = router;