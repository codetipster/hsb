const express = require("express");
const cors = require("cors");
const errors = require('./middlewares/errors');
const uploader = require('./middlewares/upload');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

const { DEPLOYEDPATH, ORIGINPATH } = process.env;
app.use(
    cors({
        origin: [`${process.env.FRONT_URL}`, DEPLOYEDPATH, , ORIGINPATH],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(uploader.single('image')); 

//? Initial the routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
// Statics files
app.use('/uploads', express.static('uploads/'));

app.use(errors.errorHandler);

module.exports = { app };
