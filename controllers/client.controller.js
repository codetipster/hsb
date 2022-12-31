const auth = require('../middlewares/auth');
const ClientService = require('../services/client.service');
const InvoiceService = require('../services/invoice.service');
require("dotenv").config();
const { ORIGINPATH } = process.env;

exports.getClients = (req, res, next) => {

    ClientService.getClients((error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.getClientById = (req, res, next) => {
    var id = req.params.id;
    ClientService.getClientById({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.profile = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;

    ClientService.getClientById({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

//? Invoices
exports.createInvoice = (req, res, next) => {
    const token = req.headers["authorization"];
    req.body.clientId = auth.getUserDataByToken(token).id;
    req.body.image = `${ORIGINPATH}/uploads/${req.file.filename}`;

    InvoiceService.create(req.body, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.getInvoices = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;

    InvoiceService.getInvoicesByClient({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

