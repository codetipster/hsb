const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
require("dotenv").config();
const { ORIGINPATH } = process.env;

const ClientService = require('../services/client.service');
const InvoiceService = require('../services/invoice.service');
const ReportService = require('../services/report.service');
const EmployeesService = require('../services/employee.service');
const AdminService = require('../services/admin.service');
const mailService = require('../services/email.service');


exports.signup = (req, res, next) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);  // for create a unique password enven for the same two passwords

    req.body.password = bcrypt.hashSync(password, salt); // hashing the password
    req.body.image = `${ORIGINPATH}/uploads/${req.file.filename}`;

    AdminService.signup(req.body, (error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        return res.status(200).send(result);
    });
};

exports.profile = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;
    AdminService.getAdminById({ id }, (error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        return res.status(200).send(result);
    });
};


//? Accountant
exports.createAccountant = (req, res, next) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);  // for create a unique password enven for the same two passwords

    req.body.password = bcrypt.hashSync(password, salt); // hashing the password
    if (req.file)
        req.body.image = `${ORIGINPATH}/uploads/${req.file.filename}`;

    AdminService.createAccountant(req.body, (error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        mailService.sendMail({ emailTo: req.body.email, password: password, name: req.body.firstName, legalNumber: req.body.email });
        return res.status(200).send(JSON.stringify({ data: result, message: "Accountant account has been created successfully" }));
    });
};

//? Client
exports.createClient = (req, res, next) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);  // for create a unique password enven for the same two passwords

    req.body.password = bcrypt.hashSync(password, salt); // hashing the password
    if (req.file)
        req.body.image = `${ORIGINPATH}/uploads/${req.file.filename}`;

    AdminService.createClient(req.body, (error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        mailService.sendMail({ emailTo: req.body.email, password: password, name: req.body.firstName, legalNumber: req.body.legalNumber });
        return res.status(200).send(JSON.stringify({ data: result, message: "Client account has been created successfully" }));
    });
};

exports.getClients = (req, res, next) => {

    ClientService.getClients((error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

//? Statistics 
exports.statistics = (req, res, next) => {
    AdminService.getStatistics((error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        return res.status(200).send(result);
    });
};

exports.getInvoices = (req, res, next) => {
    InvoiceService.getInvoices((error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        return res.status(200).send(result);
    });
};

exports.getReports = (req, res, next) => {
    ReportService.getReports((error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        return res.status(200).send(result);
    });
};

exports.getEmployees = (req, res, next) => {
    EmployeesService.getEmployees((error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        return res.status(200).send(result);
    });
};

