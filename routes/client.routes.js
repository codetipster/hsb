const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller');
const userController = require('../controllers/user.controller');

router.post('/login', clientController.login);
router.get('/profile', clientController.profile);
router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClientById);

router.post('/invoices', clientController.createInvoice);
router.get('/invoices', clientController.getInvoices);
router.get('/reports', clientController.getReports);

router.post('/employees', clientController.createEmployee);
router.get('/employees', clientController.getEmployees);
router.put('/employees/:id', clientController.updateEmployee);
router.delete('/employees/:id', clientController.deleteEmployee);

module.exports = router;