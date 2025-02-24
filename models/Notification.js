const { DataTypes } = require('sequelize');
const sequelize = require('../database');
// const User = require('./User');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },

  videoId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Video ID should be required
    references: {
      model: 'Videos',
      key: 'id',
    },
  },

  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // New column to track read/unread status
  },
  
}, {
  timestamps: true,
  tableName: 'Notifications'
});

module.exports = Notification;
