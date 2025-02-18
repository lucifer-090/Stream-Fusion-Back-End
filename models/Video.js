const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Use sequelize instance
const User = require("./User"); // Import User model

const Video = sequelize.define(
  "Video",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Reference the correct table name
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "Videos",
  }
);

module.exports = Video;
