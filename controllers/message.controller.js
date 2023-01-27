const auth = require('../middlewares/auth');
const MessageService = require('../services/message.service');

exports.createMessage = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;
    const { receiver } = req.body;
    req.body.author = id;
    if (receiver == null) req.body.receiver = id;
    console.log(req.body.receiver);
    MessageService.create(req.body, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};

exports.getClientMessages = (req, res, next) => {
    const token = req.headers["authorization"];
    var id = auth.getUserDataByToken(token).id;

    MessageService.getClientMessages(id, (error, result) => {
        if (error) return next(error);

        return res.status(200).send(result);
    });
};
