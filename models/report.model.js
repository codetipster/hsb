const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOption = {
    collection: "report",
    timestamps: true,
};


const Report = new Schema(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        name: { type: String, required: [true, "please provide report name"] },
        file: { type: String, default: "" },
    },
    baseOption
);


Report.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const ReportModel = module.exports = mongoose.model('report', Report);