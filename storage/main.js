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
      const filePath = req.file.path;
      console.log("--URL--");
      console.log(filePath);
      const formattedFilePath = filePath.split('\\').slice(1).join('/');
      const imgUrl = `${req.protocol}://${req.get('host')}/${formattedFilePath}`;
      console.log(imgUrl);
      resolve(imgUrl);
    });
  };
