const { DataTypes } = require("sequelize");
const sequelize = require("../database"); 
const User = require("./User");
const Video = require("./Video");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    videoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Videos",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "Comments",
  }
);

module.exports = Comment;
