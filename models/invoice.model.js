const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOption = {
    collection: "invoice",
    timestamps: true,
};

const status = Object.freeze(["COMPLETED", "INREVIEW", "NEEMOREDATA"]);

const Invoice = new Schema(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        name: { type: String, required: [true, "please provide invoice name"] },
        image: { type: String, default: "" },
        status: {
            type: String,
            trim: true,
            enum: status,
            required: true,
            default: "INREVIEW",
        },
    },
    baseOption
);


Invoice.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const InvoiceModel = module.exports = mongoose.model('invoice', Invoice);