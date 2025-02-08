const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const Video = sequelize.define('Video', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
  },
  videoPath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadedBy: { 
    type: DataTypes.STRING, 
    allowNull: false }, // Foreign key for the User table
}, {
  timestamps: true,
  tableName: 'Videos'
});

// Video.associate = (models) => {
//   Video.belongsTo(models.User, { foreignKey: 'userId', as: 'uploader' }); // Relate Video to User
// };

// Define relationship
Video.belongsTo(User, { foreignKey: 'id' });
User.hasMany(Video, { foreignKey: 'id' });

module.exports = Video;
