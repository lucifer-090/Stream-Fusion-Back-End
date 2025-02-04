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

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi'];
    const allowedTypes = [
      'video/mp4',
      'video/mkv',
      'video/x-matroska',
      'video/avi',
      'video/mov',
      'video/quicktime'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  },
 });

// Video upload route
router.post('/upload', upload.single('video'), videoController.upload);

// Get all videos
router.get('/videoList', videoController.getAllVideos);

module.exports = router;
