var admin = require("firebase-admin");
var fcm = require('fcm-node');

var serviceAccount = require("../config/push-notification-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var FCM = new fcm(serviceAccount);

exports.sendClientNotification = ({ deviceToken,title, messageBody, type }, callback) => {
    const msg = {
        to: deviceToken,
        notification: {
            title: title,
            body: messageBody,
            sound: 'ping.aiff',
            delivery_receipt_requested: 'true'
        },
        data: {
            messageBody: messageBody,
            type: type
        }
    };
    FCM.send(msg, callback);
};