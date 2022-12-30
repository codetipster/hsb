const { AdminModel } = require('../models/admin.model');


// callback is any reference to executable code that is passed as an argument to another piece of code
async function signup(params, callback) {
    if (params.email === undefined) return callback({ message: "Email required." });

    AdminModel.create(params).then((response) => {
        return callback(null, response);

    }).catch((error) => {
        return callback(error);
    });
}


module.exports = {
    signup
}