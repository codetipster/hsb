const ClientService = require('../services/client.service');

exports.getClients = (req, res, next) => {

    ClientService.getClients((error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.getClientById = (req, res, next) => {
    var id = req.params.id;
    ClientService.getClientById({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};
