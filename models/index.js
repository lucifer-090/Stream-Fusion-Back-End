// const User = require('./User');
// const Video = require('./Video');



// module.exports = {
//   User,
//   Video
// }; 

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");

// ✅ Import models directly
const User = require("./User");
const Video = require("./Video");

// ✅ Define relationships inside `index.js`
User.hasMany(Video, { foreignKey: "uploadedBy", as: "videos" });
Video.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });

// ✅ Attach sequelize instance
const db = { sequelize, Sequelize, User, Video };

module.exports = db; // ✅ Now we use `db` in controllers



