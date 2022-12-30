const jwt = require('jsonwebtoken');
require("dotenv").config();
const { SECRETKEY } = process.env;


function authenticationToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (authHeader == null) return res.sendStatus(401);

    jwt.verify(authHeader, SECRETKEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function generateAccessToken({ id, email }) {
    return jwt.sign({ id: id, email: email }, SECRETKEY, {
        expiresIn: "1y",
    });
}

function getUserDataByToken(token) {
    return jwt.decode(token).data;
}

module.exports = {
    authenticationToken,
    generateAccessToken,
    getUserDataByToken,
}
