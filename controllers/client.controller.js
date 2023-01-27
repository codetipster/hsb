const auth = require('../middlewares/auth');
const ClientService = require('../services/client.service');
const InvoiceService = require('../services/invoice.service');
const ReportsService = require('../services/report.service');
const EmployeeService = require('../services/employee.service');
const otpGenerator = require('otp-generator')
const bcrypt = require('bcryptjs');
const mailService = require('../services/email.service');


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

exports.updateClientStatus = (req, res, next) => {
    var id = req.params.id;
    ClientService.updateClientStatus({ id, params: req.body }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.deleteClient = (req, res, next) => {
    var id = req.params.id;

    ClientService.deleteClient({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.sendOtpCode = (req, res, next) => {
    var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    ClientService.saveOtpCode({ email: req.body.email, otpCode: otp }, (error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        mailService.sendOtp({ emailTo: req.body.email, name: result.firstName, otpCode: otp });
        return res.status(200).send(JSON.stringify({ data: result, message: "OTP code has been created successfully" }));
    });
};

exports.updatePassword = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    newPassword = bcrypt.hashSync(password, salt);

    ClientService.updatePassword({ id: id, password: newPassword }, (error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        return res.status(200).send(JSON.stringify({ data: result, message: "Password has been created successfully" }));
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
    console.log(id);

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
    const { client_id } = req.body;

    var id = client_id == null ?
        auth.getUserDataByToken(token).id : client_id;

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