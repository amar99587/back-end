const multer = require("multer");
const path = require('path');
const fs = require('fs');

exports.process = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const destination = `uploads/`;
        fs.mkdirSync(destination, { recursive: true });
        cb(null, destination); // Specify the directory to save the uploaded images
      },
      filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const uniqueFilename = `${file.originalname}`; // Generate a unique filename for the uploaded image
        cb(null, uniqueFilename);
      },
    }),
  });
  
exports.url = (req) => {
    return new Promise((resolve, reject) => {
      const imgUrl = `https://${req.get('host')}/${req.file.filename}`;
      console.log(imgUrl);
      resolve(imgUrl);
    });
  };
