const bcrypt = require('bcryptjs');
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

        return res.status(200).send({
            data: result,
        });
    });
};