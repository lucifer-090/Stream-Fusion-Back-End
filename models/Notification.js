// module.exports = (sequelize, DataTypes) => {
//     const Notification = sequelize.define("Notification", {
//       message: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER, // User who uploaded the video
//         allowNull: false,
//       },
//     });
  
//     Notification.associate = (models) => {
//       Notification.belongsTo(models.User, { foreignKey: "userId" });
//     };
  
//     return Notification;
//   };
  

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
}, {
  timestamps: true,
  tableName: 'Notifications'
});

// Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Notification;
