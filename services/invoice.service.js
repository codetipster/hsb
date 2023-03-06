const InvoiceModel = require('../models/invoice.model');
const { AccountantModel } = require('../models/accountant.model');
const { ClientModel } = require('../models/client.model');
const notification = require('../controllers/push-notification');


async function create(params, callback) {
    if (params.name == null) return callback({ message: "Invoice name required!" });
    var client = await ClientModel.findById(params.clientId);
    InvoiceModel.create(params).then((response) => {
        notification.sendClientNotification(
            {
                userId: client.accountantId,
                deviceToken: '',
                title: 'Invoice Added',
                messageBody: 'A new invoice has been added',
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


async function getInvoices(callback) {
    InvoiceModel.find().then((response) => {
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

async function updateInvoice({ id, params }, callback) {
    const filter = { _id: id };
    try {
        var response = await InvoiceModel.findOneAndUpdate(filter, params, { new: true });
        var client = await ClientModel.findById(params.clientId);
        console.log(client);
        if (client != null) {
            notification.sendClientNotification(
                {
                    userId: client.id,
                    deviceToken: client.deviceToken,
                    title: 'Invoice Updated',
                    messageBody: 'Your invoice status has been updated!',
                    type: 'message'
                },
                (error, result) => {
                    console.log(result);
                },
            );
        }
        return callback(null, response);

    } catch (error) {
        return callback(error);
    }

}



module.exports = {
    create,
    getInvoices,
    getInvoicesByClient,
    getInvoicesByAccountant,
    updateInvoice,
}