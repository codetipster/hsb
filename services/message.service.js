const MessageModel = require('../models/message.model');
const { ClientModel } = require('../models/client.model');
const { AccountantModel } = require('../models/accountant.model');

async function create(params, callback) {
    if (params.text == null) return callback({ message: "Message content required!" });

    MessageModel.create(params).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}

async function getClientMessages(id, callback) {
    var clientMessages = [];
    var client = await ClientModel.findById(id);
    var sentMessages = await MessageModel.find({ author: id });
    var receivedMessages = await MessageModel.find({ author: client.accountantId });

    for (let i = 0; i < sentMessages.length; i++) {
        clientMessages.push({
            "author": {
                "firstName": client.firstName,
                "id": client._id,
                "lastName": client.lastName
            },
            "createdAt": sentMessages[i].createdAt,
            "id": sentMessages[i]._id,
            "status": sentMessages[i].status,
            "text": sentMessages[i].text,
            "type": sentMessages[i].type,
        });
    }

    if (receivedMessages.length > 0) {
        var recieved = await AccountantModel.findById(receivedMessages[0].author);
        for (let i = 0; i < receivedMessages.length; i++) {

            clientMessages.push({
                "author": {
                    "firstName": recieved.firstName,
                    "id": recieved._id,
                    "lastName": recieved.lastName
                },
                "createdAt": receivedMessages[i].createdAt,
                "id": receivedMessages[i]._id,
                "status": receivedMessages[i].status,
                "text": receivedMessages[i].text,
                "type": receivedMessages[i].type,
            });
        }
    }

    return callback(null, clientMessages);
}


module.exports = {
    create,
    getClientMessages,
}