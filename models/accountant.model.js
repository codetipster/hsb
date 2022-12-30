const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { userSchema } = require("./user.model");

const status = Object.freeze(["ACTIVE", "DELETED", "DEACTIVATED"]);

const Accountant = new Schema({
    mobileNumber: { type: String, required: [true, "please provide your mobile number"] },
    homeAddress: { type: String, required: [true, "please provide your home address"] },
    status: {
        type: String,
        trim: true,
        enum: status,
        required: true,
        default: "ACTIVE",
    },
});

const AccountantModel = userSchema.discriminator("accountant", Accountant);

AccountantModel.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

module.exports = { AccountantModel };
