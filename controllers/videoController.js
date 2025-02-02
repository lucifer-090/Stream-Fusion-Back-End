const { Video } = require('../models');
const path = require('path');

// Upload a video and store its path in the database
exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded!' });
    }

    const { title, description, category, tags } = req.body;
    const videoPath = `/uploads/${req.file.filename}`; // Store relative path

    // Save video details in the database
    const video = await Video.create({
      title,
      description,
      category,
      tags,
      videoPath, // Ensure this field exists in the Video model
    });

    res.status(201).json({ message: 'Video uploaded successfully!', video });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
