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

async function updateAccountantStatus({ id, params }, callback) {
    const filter = { _id: id };
    try {
        var response = await AccountantModel.findOneAndUpdate(filter, params, { new: true });
        return callback(null, response);

    } catch (error) {
        return callback(error);
    }

}


module.exports = {
    getAccountants,
    getAccountantById,
    updateAccountantStatus
}