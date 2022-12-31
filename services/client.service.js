const { ClientModel } = require('../models/client.model');


async function getClients(callback) {
    ClientModel.find({ user: 'client' }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function getClientById({ id }, callback) {
    ClientModel.findById(id).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}



module.exports = {
    getClients,
    getClientById,
}