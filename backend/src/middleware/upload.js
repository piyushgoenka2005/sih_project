// multer.js
const multer = require('multer');
const path = require('path');

// Set the storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        console.log("DDDD", file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension); // Set the file name
    }
});

// Create a Multer instance with the specified storage engine
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // Set a file size limit (in this example, 10 MB)
    },
    fileFilter: function (req, file, cb) {
        // Define allowed image file types
        const allowedFileTypes = /jpeg|jpg|png|gif|bmp|webp/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Only image files are allowed');
        }
    }
});

module.exports = upload;
