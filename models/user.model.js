///? This model contains the base user model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOption = {
    discriminatorKey: "user",
    collection: "user",
    timestamps: true,
};


const userSchema = new Schema(
    {
        email: { type: String, required: [true, "please provide your email"] },
        firstName: { type: String, trim: true, required: [true, "please provide your first name"] },
        lastName: { type: String, trim: true, required: [true, "please provide your last name"] },
        password: { type: String, required: [true, "please provide your password"] },
        image: { type: String, default: "" },
    },
    baseOption
);

module.exports.userSchema = mongoose.model(
    "userSchema", userSchema
);