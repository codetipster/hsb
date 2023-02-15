const userServices = require('../services/user.service');
const NotificationService = require('../services/notification.service');

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    if (email == null || password == null) return res.status(400).send("Email and Password are required!");

    userServices.login({ email, password }, (error, result) => {
        if (error) return next(error.message);

        return res.status(200).send(result);
    });
};

exports.getNotifications = (req, res, next) => {
    var id = req.params.id;

    if (id == null) return res.status(400).send("User id is required!");

    NotificationService.get({ id }, (error, result) => {
        if (error) return next(error.message);

        return res.status(200).send(result);
    });
};
