const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");

// Import models
const User = require("./User");
const Video = require("./Video");
const Notification = require("./Notification");

// Define relationships
// User & Video Relationship (Uploader)
User.hasMany(Video, { foreignKey: "uploadedBy", as: "videos" });
Video.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });

// User & Notification Relationship
User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

// Video & Notification Relationship
Video.hasMany(Notification, { foreignKey: "videoId", as: "videoNotifications" });
Notification.belongsTo(Video, { foreignKey: "videoId", as: "video" });

// Export database instance
const db = { sequelize, Sequelize, User, Video, Notification };

module.exports = db; // Now we use `db` in controllers



