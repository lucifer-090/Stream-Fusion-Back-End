const { Video } = require('../models');

// Upload a video
exports.upload = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const videoPath = req.file.path;

    const video = await Video.create({
      title,
      description,
      category,
      tags,
      video_path: videoPath,
    });

    res.status(201).json({ message: 'Video uploaded successfully!', video });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
