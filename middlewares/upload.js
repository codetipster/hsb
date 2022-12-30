const path = require("path");
const multer = require('multer');
require("dotenv").config();
const { STATICPATH } = process.env;

// storage engine 
const storage = multer.diskStorage({
    destination: STATICPATH,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploader = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
})


module.exports = uploader