const db = require("../models"); // Import entire db
const { Comment, User } = db; // Extract models

// ✅ Add a comment
exports.addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    if (!text || !videoId) {
      return res.status(400).json({ message: "Text and videoId are required" });
    }

    const comment = await Comment.create({
      text,
      videoId,
      userId: req.user.id,
    });

    // Fetch the new comment with the user's details
    const commentWithUser = await Comment.findOne({
        where: { id: comment.id },
        include: [{ model: User, as: "user", attributes: ["id", "fullname"] }],
      });

    res.status(201).json(commentWithUser);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch comments for a specific video
exports.getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.findAll({
      where: { videoId },
      include: [{ model: User, as: "user", attributes: ["id", "fullname"] }],
      order: [["createdAt", "DESC"]],
    });

    if (!comments) {
        return res.status(404).json({ message: "No comments found for this video." });
      }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: error.message });
  }
};
