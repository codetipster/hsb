const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
require("dotenv").config();
const { ORIGINPATH } = process.env;

const AdminService = require('../services/admin.service');


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
    req.body.image = `${ORIGINPATH}/uploads/${req.file.filename}`;

    AdminService.createAccountant(req.body, (error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

        return res.status(200).send(result);
    });
};

//? Client
exports.createClient = (req, res, next) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);  // for create a unique password enven for the same two passwords

    req.body.password = bcrypt.hashSync(password, salt); // hashing the password
    req.body.image = `${ORIGINPATH}/uploads/${req.file.filename}`;

    AdminService.createClient(req.body, (error, result) => {
        if (error) return next(error); // go to the next middleware which is our error handler

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