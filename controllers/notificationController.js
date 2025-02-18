const { Notification } = require("../models");

// Fetch notifications for the logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id }, // Fetch all notifications for this user
      order: [["createdAt", "DESC"]],
      limit: 20, // Limit to the latest 10 notifications
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mark a **specific** notification as read when clicked
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findOne({
      where: { id: notificationId, userId: req.user.id },
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.update({ read: true }); // Mark it as read

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mark **all** notifications as read when clicking the button
exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.update(
      { read: true }, // Mark all as read
      { where: { userId: req.user.id, read: false } } // Only unread ones
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ error: error.message });
  }
};
