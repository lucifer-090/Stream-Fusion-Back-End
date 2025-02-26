const { Op } = require("sequelize");
const db = require('../models'); // Import `db`
const path = require('path');

// Use `db.Video` and `db.User`
const { Video, User, Notification } = db;

// Upload a video and store its path in the database
exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded!' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const { title, description, category, tags} = req.body;
    const videoPath = `/uploads/${req.file.filename}`; // Store relative path
    const uploadedBy = req.user.id; // Extract user name from token (auth middleware)


    // Save video details in the database
    const video = await Video.create({
      title,
      description,
      category,
      tags,
      videoPath, // Ensure this field exists in the Video model
      uploadedBy,
    });

  // Fetch all users except the uploader
  const usersToNotify = await User.findAll({
    where: {
      id: { [Op.ne]: uploadedBy }, // Exclude the uploader
    },
  });

  if (!usersToNotify || usersToNotify.length === 0) {
    console.log("No users to notify.");
  } else {
    // Create notifications for each user
    const notifications = usersToNotify.map((user) => ({
      message: `${req.user.fullname} uploaded a new video: ${title}`,
      userId: user.id,
      videoId: video.id,
      isRead: false,
    }));

    await Notification.bulkCreate(notifications);
  }

  res.status(201).json({ message: 'Video uploaded successfully!', video });
} catch (error) {
  console.log("Upload error details:", error.errors || error);
  res.status(500).json({ error: error.message, details: error.errors || "No additional details" });
}
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      include: [{ 
        model: User, 
        as: 'uploader', 
        attributes: ['fullname'] // Fetch uploader's name
      }],
      attributes: ['id', 'title', 'description', 'videoPath', 'uploadedBy', 'createdAt'],
      order: [['createdAt', 'DESC']], // Show latest videos first
    });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id, {
      include: [{ 
        model: User, 
        as: "uploader", 
        attributes: ["id", "fullname"] // Include uploader name
      }],
    });
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video); // createdAt is included here
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.searchVideos = async (req, res) => {
//   try {
//     const { query } = req.query; // Get the search query from request
//     if (!query) {
//       return res.status(400).json({ message: "Query parameter is required" });
//     }

//     const videos = await Video.findAll({
//       where: {
//         title: {
//           [Op.iLike]: `%${query}%`, // Case-insensitive matching
//         },
//       },
//       attributes: ["id", "title", "uploadedBy", "videoPath"], // Return only necessary fields
//     });

//     if (videos.length === 0) {
//       return res.status(404).json({ message: "No videos found" });
//     }


//     res.status(200).json(videos); // Send the matching videos
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.searchVideos = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const videos = await Video.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },  // Search by title
          { category: { [Op.iLike]: `%${query}%` } } // Search by category
        ],
      },
      attributes: ["id", "title", "category", "uploadedBy", "videoPath"],
      include: [{ model: User, as: "uploader", attributes: ["fullname"] }],
      limit: 20, // ✅ Return only top 10 suggestions
    });

    if (videos.length === 0) {
      return res.status(404).json({ message: "No matching videos found" });
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error searching videos:", error);
    res.status(500).json({ error: error.message });
  }
};



// Fetch remaining videos excluding the currently playing one
exports.getRemainingVideos = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch all videos except the one being played
    const remainingVideos = await Video.findAll({
      where: {
        id: { [Op.ne]: id }, // Exclude the current video
      },
      include: [{ model: User, as: "uploader", attributes: ["fullname"] }],
      attributes: ["id", "title", "videoPath"],
      limit: 20, 
    });

    res.status(200).json(remainingVideos);
  } catch (error) {
    console.error("Error fetching remaining videos:", error);
    res.status(500).json({ error: error.message });
  }
};

