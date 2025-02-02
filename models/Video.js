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
}, {
  tableName: 'videos',
  timestamps: true,
});

// Define relationship
Video.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Video, { foreignKey: 'userId' });

module.exports = Video;
