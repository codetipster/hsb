const auth = require('../middlewares/auth');
const AccountantService = require('../services/accountant.service');
const ClientService = require('../services/client.service');
const InvoiceService = require('../services/invoice.service');
const ReportService = require('../services/report.service');
require("dotenv").config();
const { ORIGINPATH } = process.env;

exports.getAccountants = (req, res, next) => {

    AccountantService.getAccountants((error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.getAccountantById = (req, res, next) => {
    var id = req.params.id;
    AccountantService.getAccountantById({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.profile = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;

    AccountantService.getAccountantById({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.updateAccountantStatus = (req, res, next) => {
    var id = req.params.id;
    AccountantService.updateAccountantStatus({ id, params: req.body }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};


//? Clients
exports.getClients = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;
    ClientService.getClientByAccountantId({ id: id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

//? Invoices
exports.getInvoices = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;

    InvoiceService.getInvoicesByAccountant({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.updateInvoice = (req, res, next) => {
    InvoiceService.updateInvoice({ id: req.params.id, params: req.body }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

//? Reports
exports.createReport = (req, res, next) => {
    req.body.file = `${ORIGINPATH}/uploads/${req.file.filename}`;

    ReportService.create(req.body, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};
