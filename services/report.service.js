const ReportModel = require('../models/report.model');


async function create(params, callback) {
    if (params.clientId == null) return callback({ message: "Client id is required!" });
    ReportModel.create(params).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}


module.exports = {
    create,
}