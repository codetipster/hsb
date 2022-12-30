const multer = require("multer");


function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        return res.status(400).json({ message: err });
    }

    if (typeof err === "validationError") {
        return res.status(400).json({ message: err.message });
    }

    if (typeof err === "UnauthorizedError") {
        return res.status(401).json({ message: err.message });
    }

    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }

    return res.status(500).json({ message: err.message });
}

module.exports = {
    errorHandler,
}