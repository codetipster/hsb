const mongoose = require("mongoose");
const { userSchema } = require("./user.model");
const Schema = mongoose.Schema;

const Admin = new Schema({});

const AdminModel = userSchema.discriminator("admin", Admin);

AdminModel.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;

    },
});

module.exports = { AdminModel };
