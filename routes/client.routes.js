const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller');

router.get('/profile', clientController.profile);
router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClientById);

router.post('/invoices', clientController.createInvoice);
router.get('/invoices', clientController.getInvoices);
router.get('/reports', clientController.getReports);


module.exports = router;