const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const { ClientModel } = require('../models/client.model');
const InvoiceModel = require('../models/invoice.model');
const ReportModel = require('../models/report.model');
const EmployeeModel = require('../models/employee.model');


async function login({ legalNumber, password }, callback) {
    const user = await ClientModel.findOne({ legalNumber });
    if (user == null || user.status == "INACTIVE") return callback({ message: "No user founded!" });

    if (bcrypt.compareSync(password, user.password)) {
        const token = auth.generateAccessToken({ id: user._id, email: user.email });
        return callback(null, { ...user.toJSON(), token });
    } else {
        return callback({ message: "Invalid credentials!" });
    }
}

async function logout({ id }, callback) {
    const filter = { _id: id };
    const params = { deviceToken: "" };
    try {
        var response = await ClientModel.findOneAndUpdate(filter, params, { new: true });
        return callback(null, response);

    } catch (error) {
        return callback(error);
    }
}

async function updateProfile({ id, params }, callback) {
    const filter = { _id: id };
    console.log(params);
    ClientModel.findOneAndUpdate(filter, params, { new: true }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}


async function getClients(callback) {
    await ClientModel.find().then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
    // if (clients == null) return callback('No clients');

    // for (let i = 0; i < clients.length; i++) {
    //     const clientInvoices = await InvoiceModel.find({ clientId: clients[i]._id });
    //     const clientReports = await ReportModel.find({ clientId: clients[i]._id });
    //     const clientEmployees = await EmployeeModel.find({ clientId: clients[i]._id });
    //     clientList.push({ ...clients[i].toJSON(), 'invoices': clientInvoices, 'reports': clientReports, 'employees': clientEmployees });

    // }
    // return callback(null, clientList);
}

async function getClientById({ id }, callback) {
    try {
        var client = await ClientModel.findById(id);
        const clientInvoices = await InvoiceModel.find({ clientId: client._id });
        const clientReports = await ReportModel.find({ clientId: client._id });
        const clientEmployees = await EmployeeModel.find({ clientId: client._id });
        return callback(null, { ...client.toJSON(), 'invoices': clientInvoices, 'reports': clientReports, 'employees': clientEmployees });
    } catch (error) {

        return callback(error);
    }
}

async function getClientByAccountantId({ id }, callback) {
    await ClientModel.find({ accountantId: id }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function updateClientStatus({ id, params }, callback) {
    const filter = { _id: id };
    try {
        var response = await ClientModel.findOneAndUpdate(filter, params, { new: true });
        return callback(null, response);

    } catch (error) {
        return callback(error);
    }

}

async function deleteClient({ id }, callback) {
    const filter = { _id: id };
    try {
        var response = await ClientModel.deleteOne(filter);
        await InvoiceModel.deleteMany({ clientId: id });
        await ReportModel.deleteMany({ clientId: id });
        await EmployeeModel.deleteMany({ clientId: id });

        return callback(null, response);

    } catch (error) {
        return callback(error);
    }

}

async function updatePassword({ id, password }, callback) {
    const filter = { _id: id };
    const data = { password: password, otp: "" };

    try {
        var response = await ClientModel.findOneAndUpdate(filter, data, { new: true });
        return callback(null, response);

    } catch (error) {
        return callback(error);
    }

}

async function saveOtpCode({ email, otpCode }, callback) {
    try {
        var response = await ClientModel.findOneAndUpdate({ email: email }, { 'otp': otpCode }, { new: true });
        if (response == null) callback('Email not found!');
        const token = auth.generateAccessToken({ id: response._id, email: response.email });
        return callback(null, { ...response.toJSON(), token });

    } catch (error) {
        return callback(error);
    }

}


module.exports = {
    login,
    logout,
    getClients,
    updateProfile,
    getClientById,
    getClientByAccountantId,
    updateClientStatus,
    deleteClient,
    saveOtpCode,
    updatePassword,
}