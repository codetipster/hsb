const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller');

router.get('/profile', clientController.profile);
router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClientById);

module.exports = router;