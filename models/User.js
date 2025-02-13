// const { DataTypes } = require('sequelize');
// const sequelize = require('../database');

// const User = sequelize.define('User', {
//   fullname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   contact: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   timestamps: true,
//   tableName: 'Users'
// });

// // User.associate = (models) => {
// //   User.hasMany(models.Video, { foreignKey: 'userId', as: 'videos' }); // Relate User to Videos
// // };
// User.hasMany(require('./Video'), { foreignKey: 'uploadedBy' });

// module.exports = User;

const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // ✅ Use sequelize instance

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      // isEmail: true, // ✅ Ensures valid email format
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Users",
  }
);

module.exports = User;

