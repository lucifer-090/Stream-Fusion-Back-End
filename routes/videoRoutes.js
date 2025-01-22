const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController'); // Import video controller
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Name files with timestamp
  },
});

const upload = multer({ storage });

// Video upload route
router.post('/upload', upload.single('video'), videoController.upload);

// Get all videos
router.get('/', videoController.getAllVideos);

module.exports = router;
