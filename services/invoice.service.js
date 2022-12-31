const InvoiceModel = require('../models/invoice.model');
const { AccountantModel } = require('../models/accountant.model');
const { ClientModel } = require('../models/client.model');


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

async function getInvoicesByAccountant({ id }, callback) {
    var invoices = [];
    if (id == null) return callback({ message: "Client id required!" });

    var clients = await ClientModel.find({ accountantId: id });
    if (clients == null) return callback({ message: "No invoices found" });

    for (let i = 0; i < clients.length; i++) {
        const clientInvoices = await InvoiceModel.find({ clientId: clients[i]._id });
        invoices.push.apply(invoices, clientInvoices);
    }

    return callback(null, invoices);
}


module.exports = {
    create,
    getInvoicesByClient,
    getInvoicesByAccountant,
}