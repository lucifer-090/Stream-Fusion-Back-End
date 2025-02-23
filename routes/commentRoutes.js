const express = require("express");
const router = express.Router();
const { addComment, getCommentsByVideo } = require("../controllers/commentController");
const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, addComment);
router.get("/:videoId", getCommentsByVideo);

module.exports = router;
