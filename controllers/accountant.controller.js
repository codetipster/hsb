const auth = require('../middlewares/auth');
const AccountantService = require('../services/accountant.service');

exports.getAccountants = (req, res, next) => {

    AccountantService.getAccountants((error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.getAccountantById = (req, res, next) => {
    var id = req.params.id;
    AccountantService.getAccountantById({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.profile = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;

    AccountantService.getAccountantById({ id }, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};
