const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const EmployeeModel = require('../models/employee.model');
const { ClientModel } = require('../models/client.model');
const notification = require('../controllers/push-notification');

async function create(params, callback) {
    var client = await ClientModel.findById(params.clientId);
    EmployeeModel.create(params).then((response) => {
        notification.sendClientNotification(
            {
                userId: client.accountantId,
                deviceToken: '',
                title: 'Employee Created',
                messageBody: 'A new Employee has been added',
                type: 'message'
            },
            (error, result) => {
                console.log(result);
            },
        );
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
    try {
        var employee = await EmployeeModel.findOneAndUpdate(filter, params, { new: true });
        var client = await ClientModel.findById(employee.clientId);
        notification.sendClientNotification(
            {
                userId: client.accountantId,
                deviceToken: '',
                title: 'Employee Updated',
                messageBody: 'An Employee has been Updated',
                type: 'message'
            },
            (error, result) => {
                console.log(result);
            },
        );
        return callback(null, employee);
    }
    catch (error) {
        return callback(error);
    };
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