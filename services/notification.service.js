const NotificationModel = require('../models/notification.model');

async function create(params, callback) {
    await NotificationModel.create(params);
}


async function get(id, callback) {
    await NotificationModel.find(id).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

module.exports = {
    create,
    get,
}