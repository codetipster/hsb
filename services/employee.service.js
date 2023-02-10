const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const EmployeeModel = require('../models/employee.model');

async function create(params, callback) {
    EmployeeModel.create(params).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function getEmployees(callback) {
    EmployeeModel.find().then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}
async function get({ id }, callback) {
    EmployeeModel.find({ clientId: id }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function update({ id, params }, callback) {
    const filter = { _id: id };

    EmployeeModel.findOneAndUpdate(filter, params, { new: true }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function remove({ id }, callback) {
    EmployeeModel.deleteOne({ id })
        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}

module.exports = {
    create,
    get,
    getEmployees,
    update,
    remove,
}