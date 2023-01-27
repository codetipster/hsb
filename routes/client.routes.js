const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller');
const userController = require('../controllers/user.controller');
const messageController = require('../controllers/message.controller');

router.post('/login', clientController.login);
router.get('/profile', clientController.profile);
router.put('/profile', clientController.updateProfile);
router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClientById);
router.delete('/clients/:id', clientController.deleteClient);
router.put('/clients/:id', clientController.updateClientStatus);

router.post('/invoices', clientController.createInvoice);
router.get('/invoices', clientController.getInvoices);
router.get('/reports', clientController.getReports);

router.post('/employees', clientController.createEmployee);
router.get('/employees', clientController.getEmployees);
router.put('/employees/:id', clientController.updateEmployee);
router.delete('/employees/:id', clientController.deleteEmployee);

router.post('/messages', messageController.createMessage);
router.get('/client-messages', messageController.getClientMessages);


module.exports = router;