const { userSchema } = require('../models/user.model');
const NotificationModel = require('../models/notification.model');
const { ClientModel } = require('../models/client.model');

async function create(params, callback) {
    await NotificationModel.create(params);
}


async function get(id, callback) {
    const user = await userSchema.findById(id);
    if (user.user == "admin") {
        await NotificationModel.find().then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    } else {
        await NotificationModel.find({ userId: id }).then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    }
}

module.exports = {
    create,
    get,
}