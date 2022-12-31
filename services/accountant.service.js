const { AccountantModel } = require('../models/accountant.model');


async function getAccountants(callback) {
    AccountantModel.find({ user: 'accountant' }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function getAccountantById({ id }, callback) {
    AccountantModel.findById(id).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}



module.exports = {
    getAccountants,
    getAccountantById
}