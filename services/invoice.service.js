const InvoiceModel = require('../models/invoice.model');


async function create(params, callback) {
    if (params.name == null) return callback({ message: "Invoice name required!" });

    InvoiceModel.create(params).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function getInvoicesByClient({ id }, callback) {
    if (id == null) return callback({ message: "Client id required!" });

    InvoiceModel.find({ clientId: id }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}


module.exports = {
    create,
    getInvoicesByClient,
}