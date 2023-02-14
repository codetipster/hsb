const ReportModel = require('../models/report.model');
const notification = require('../controllers/push-notification');
const { ClientModel } = require('../models/client.model');


async function create(params, callback) {
    if (params.clientId == null) return callback({ message: "Client id is required!" });
    var client = await ClientModel.findById(params.clientId);
    ReportModel.create(params).then((response) => {
        notification.sendClientNotification(
            {
                deviceToken: client.deviceToken,
                title: 'Report',
                messageBody: 'You have received a new report',
                type: 'message'
            },
            (error, result) => {
                return callback(null, {});
            },
        );
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function getReportsByClient({ id }, callback) {
    if (id == null) return callback({ message: "Client id required!" });

    ReportModel.find({ clientId: id }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function getReports(callback) {
    ReportModel.find().then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

module.exports = {
    create,
    getReports,
    getReportsByClient,
}