// Import the main app
const app = require('./app');
const sequelize = require('./database');
const Video = require('./models/Video'); // Ensure models are loaded

// Start the server
const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true }) // Sync models to the database
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err.message);
  });
