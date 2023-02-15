const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOption = {
    collection: "notification",
    timestamps: true,
};

const Notification = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        title: { type: String, default: "" },
        body: { type: String, default: "" },
        messageBody: { type: String, default: "" },

    },
    baseOption
);


Notification.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const NotificationModel = module.exports = mongoose.model('notification', Notification);