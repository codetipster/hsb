const mongoose = require("mongoose");
const { userSchema } = require("./user.model");
const Schema = mongoose.Schema;

const Admin = new Schema({});

const AdminModel = userSchema.discriminator("admin", Admin);

module.exports = { AdminModel };
