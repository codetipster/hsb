const express = require("express");
const cors = require("cors");
const errors = require('./middlewares/errors');

var { unless } = require("express-unless");
const auth = require('./middlewares/auth');
const uploader = require('./middlewares/upload');
const helmet = require("helmet");

//const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();



const isProduction = process.env.NODE_ENV === 'development';
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

// implementing helmet for security
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          isProduction ? 'trusted-cdn.com' : "'unsafe-inline'",
          isProduction ? '' : "'unsafe-eval'",
        ],
        styleSrc: [
          "'self'",
          isProduction ? 'trusted-cdn.com' : "'unsafe-inline'",
        ],
        imgSrc: ["'self'", isProduction ? 'trusted-cdn.com' : 'data:'],
        connectSrc: ["'self'", isProduction ? 'your-api.com' : 'localhost:3000'],
        fontSrc: ["'self'", isProduction ? 'trusted-cdn.com' : 'data:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        frameSrc: ["'none'"],
      },
    })
  );

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
