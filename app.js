const express = require("express");
const cors = require("cors");
const errors = require('./middlewares/errors');
var { unless } = require("express-unless");
const auth = require('./middlewares/auth');
const uploader = require('./middlewares/upload');
//const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

const { DEPLOYEDPATH, ORIGINPATH } = process.env;

app.use(cors());

// app.use(
//     cors({
//         origin: [`${process.env.FRONT_URL}`, DEPLOYEDPATH, , ORIGINPATH, "http://hsbkanzlei.de/"],
//         credentials: true,
//     })
// );

//? Check if the request that is coming to the api is having a token or not
//! In case of Token not provided or invalid will show unauthorized msg
auth.authenticationToken.unless = unless;
app.use(
    auth.authenticationToken.unless({
        path: [
            { url: "/api/user/login", method: ["POST"] },
            { url: "/api/client/login", method: ["POST"] },
            { url: "/api/client/send-otp", method: ["POST"] },
            { url: "/api/admin/signup", method: ["POST"] },
        ],
    })
);

app.use(express.json()); // for parsing application/json remove body parser
app.use(express.urlencoded({ extended: true }));
app.use(uploader.single('image'));

//? Initial the routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/client", require("./routes/client.routes"));
app.use("/api/accountant", require("./routes/accountant.routes"));
// Statics files
app.use('/uploads', express.static('uploads/')); // make the uploads folder publically available- !!???are these really public files

app.use(errors.errorHandler); // error handler middleware to prevent information leakage to client

module.exports = { app };
