const express = require("express");
const cors = require("cors");
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

module.exports = { app };
