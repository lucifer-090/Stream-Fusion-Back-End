const express = require("express");
const router = express.Router();
const { 
  getNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead 
} = require("../controllers/notificationController");
const authenticate = require("../middleware/authMiddleware");

// Route to fetch notifications (only for authenticated users)
router.get("/", authenticate, getNotifications);

// Route to mark a single notification as read when clicked
router.put("/read/:notificationId", authenticate, markNotificationAsRead);

// Route to mark ALL notifications as read when button is clicked
router.put("/read", authenticate, markAllNotificationsAsRead);

module.exports = router;
