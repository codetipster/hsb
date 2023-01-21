const auth = require('../middlewares/auth');
const ClientService = require('../services/client.service');
const InvoiceService = require('../services/invoice.service');
const ReportsService = require('../services/report.service');
const EmployeeService = require('../services/employee.service');
require("dotenv").config();
const { ORIGINPATH } = process.env;

exports.login = (req, res, next) => {
    const { legalNumber, password } = req.body;

    if (legalNumber == null || password == null) return res.status(400).send("Legal number and Password are required!");

    ClientService.login({ legalNumber, password }, (error, result) => {
        if (error) return next(error.message);

        return res.status(200).send(result);
    });
};


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

exports.updateProfile = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;
    if (req.file) {
        req.body.file = `${ORIGINPATH}/uploads/${req.file.filename}`;
    }

    ClientService.updateProfile({ id, params: req.body }, (error, result) => {
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
    const { client_id } = req.body;

    var id = client_id == null ?
        auth.getUserDataByToken(token).id : client_id;

    InvoiceService.getInvoicesByClient({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

//? Reports

exports.getReports = (req, res, next) => {
    const token = req.headers["authorization"];
    const { client_id } = req.body;

    var id = client_id == null ?
        auth.getUserDataByToken(token).id : client_id;

    ReportsService.getReportsByClient({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

//? Employee

exports.createEmployee = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;
    req.body.clientId = auth.getUserDataByToken(token).id;

    EmployeeService.create(req.body, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.getEmployees = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;

    EmployeeService.get({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.updateEmployee = (req, res, next) => {
    EmployeeService.update({ id: req.params.id, params: req.body }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.deleteEmployee = (req, res, next) => {
    EmployeeService.remove({ id: req.params.id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};