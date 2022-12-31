const { AdminModel } = require('../models/admin.model');
const { ClientModel } = require('../models/client.model');


// callback is any reference to executable code that is passed as an argument to another piece of code
async function signup(params, callback) {
    if (params.email === undefined) return callback({ message: "Email required." });

    AdminModel.create(params).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function getAdminById({ id }, callback) {
    AdminModel.findById(id).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

//? Accountant
async function createAccountant(params, callback) {
    if (params.email === undefined) return callback({ message: "Email required." });

    AccountantModel.create(params).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

//? Client
async function createClient(params, callback) {
    if (params.email === undefined) return callback({ message: "Email required." });

    ClientModel.create(params).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}


module.exports = {
    signup,
    getAdminById,
    createAccountant,
    createClient,
}