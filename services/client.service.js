const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const { ClientModel } = require('../models/client.model');

async function login({ legalNumber, password }, callback) {
    const user = await ClientModel.findOne({ legalNumber });
    if (user == null) return callback({ message: "No user founded!" });

    if (bcrypt.compareSync(password, user.password)) {
        const token = auth.generateAccessToken({ id: user._id, email: user.email });
        return callback(null, { ...user.toJSON(), token });
    } else {
        return callback({ message: "Invalid credentials!" });
    }
}

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

async function getClientByAccountantId({ id }, callback) {
    ClientModel.find({ accountantId: id }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}



module.exports = {
    login,
    getClients,
    getClientById,
    getClientByAccountantId,
}