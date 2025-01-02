const multer = require("multer");
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../uploads');  // Path to the 'uploads' folder

// Ensure uploads directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });  // Create uploads directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);  // Store the files in the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use a unique file name
  },
});

const upload = multer({ storage });

module.exports = upload;
