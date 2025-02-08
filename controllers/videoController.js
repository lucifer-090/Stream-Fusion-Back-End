const { Video } = require('../models');
const { Op } = require("sequelize");
const path = require('path');

// Upload a video and store its path in the database
exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded!' });
    }

    const { title, description, category, tags} = req.body;
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
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    console.log("Videos fetched from database:", videos); // Debugging log
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id); // Sequelize automatically includes createdAt
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video); // createdAt is included here
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchVideos = async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from request
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const videos = await Video.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`, // Case-insensitive matching
        },
      },
      attributes: ["id", "title"], // Return only necessary fields
    });

    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }


    res.status(200).json(videos); // Send the matching videos
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};