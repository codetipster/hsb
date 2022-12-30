const bcrypt = require('bcryptjs');

const auth = require('../middlewares/auth');
const { userSchema } = require('../models/user.model');

async function login({ email, password }, callback) {
    const user = await userSchema.findOne({ email });
    if (user == null) return callback({ message: "No email founded!" });

    if (bcrypt.compareSync(password, user.password)) {
        const token = auth.generateAccessToken({ id: user._id, email: user.email });
        return callback(null, { ...user.toJSON(), token });
    } else {
        return callback({ message: "Invalid credentials!" });
    }
}

module.exports = {
    login,
}


