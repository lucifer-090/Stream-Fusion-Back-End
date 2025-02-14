
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");


// ✅ Import models directly
const User = require("./User");
const Video = require("./Video");
const Notification = require("./Notification");

// ✅ Define relationships inside `index.js`
User.hasMany(Video, { foreignKey: "uploadedBy", as: "videos" });
Video.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });

User.hasMany(Notification, { foreignKey: "userId", as: "notifications" }); // ✅ One user has many notifications
Notification.belongsTo(User, { foreignKey: "userId", as: "user" }); // ✅ Notification belongs to a user

// ✅ Attach sequelize instance
const db = { sequelize, Sequelize, User, Video, Notification};

module.exports = db; // ✅ Now we use `db` in controllers



