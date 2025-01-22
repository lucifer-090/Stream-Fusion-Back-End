const { Sequelize } = require('sequelize');

// Configure Sequelize connection
const sequelize = new Sequelize('StreamFusion_db', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
