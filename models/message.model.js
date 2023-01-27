const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOption = {
    collection: "message"
};

const status = Object.freeze(["delivered", "error", "seen", "sending", "sent"]);

const Message = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        text: { type: String, required: [true, "please provide report text"] },
        status: {
            type: String,
            enum: status,
            required: true,
            default: "sent",
        },
        type: { type: String, default: "text" },
        createdAt: { type: Schema.Types.Number, default: 0 },

    },
    baseOption
);


Message.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const MessageModel = module.exports = mongoose.model('message', Message);