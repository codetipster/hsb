const ReportModel = require('../models/report.model');


async function create(params, callback) {
    if (params.clientId == null) return callback({ message: "Client id is required!" });
    ReportModel.create(params).then((response) => {
        notification.sendClientNotification(
            {
                deviceToken: client.deviceToken,
                title: 'Report',
                messageBody: 'You have received a new report',
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

async function getReportsByClient({ id }, callback) {
    if (id == null) return callback({ message: "Client id required!" });

    ReportModel.find({ clientId: id }).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

module.exports = {
    create,
    getReportsByClient,
}