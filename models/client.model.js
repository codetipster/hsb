const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { userSchema } = require("./user.model");

const status = Object.freeze(["ACTIVE", "INACTIVE"]);


const Client = new Schema({
    accountantId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    accountantName: { type: String, default: "" },
    legalNumber: { type: String, required: [true, "please provide your legal number"] },
    homeNumber: { type: String, required: [true, "please provide your home number"] },
    city: { type: String, required: [true, "please provide your city"] },
    zipCode: { type: String, required: [true, "please provide your zip code"] },
    jobType: { type: String, required: [true, "please provide your type of job"] },
    companyType: { type: String, required: [true, "please provide your type of Company"] },
    bankName: { type: String, required: [true, "please provide your bank name"] },
    iban: { type: String, required: [true, "please provide your IBAN"] },
    mobileNumber: { type: String, required: [true, "please provide your mobile number"] },
    taxId: { type: String, default: "" },
    notes: { type: String, default: "" },
    deviceToken: { type: String, default: "" },
    otp: { type: String, default: "" },
    status: {
        type: String,
        trim: true,
        enum: status,
        required: true,
        default: "ACTIVE",
    },
});



Client.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;

    },
});

const ClientModel = userSchema.discriminator("client", Client);

module.exports = { ClientModel };
