const { AdminModel } = require('../models/admin.model');
const { ClientModel } = require('../models/client.model');
const { AccountantModel } = require('../models/accountant.model');
const notification = require('../controllers/push-notification');


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
async function getStatistics(callback) {

    var clients = await ClientModel.find();
    var accountants = await AccountantModel.find();
    data = {
        totalClients: clients.length,
        totalAccountants: accountants.length,
    }
    return callback(null, data);
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

    const accountant = await AccountantModel.findById(params.accountantId);
    data = { ...params, 'accountantName': accountant.firstName + " " + accountant.lastName }

    ClientModel.create(data).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function sendComment({ id, message }, callback) {
    var client = await ClientModel.findById(id);
    notification.sendClientNotification(
        {
            userId: client.id,
            deviceToken: client.deviceToken,
            title: 'Admin',
            messageBody: message,
            type: 'message'
        },
        (error, result) => {
            return callback(null, {});
        },
    );
}


module.exports = {
    signup,
    getAdminById,
    getStatistics,
    createAccountant,
    createClient,
    sendComment,
}