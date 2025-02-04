// const express = require('express');
// const cors = require('cors'); // Import cors
// const bodyParser = require('body-parser');
// const sequelize = require('./database');
// const userRoutes = require('./routes/userRoutes');
// const videoRoutes = require('./routes/videoRoutes');
// const path = require('path');

// const app = express();

// // Middleware
// app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow frontend origin
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded videos statically

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/videos', videoRoutes);


// // Test route
// app.get('/', (req, res) => {
//     res.send('Welcome to StreamFusion!');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // Database connection and server start
// const PORT = process.env.PORT || 9999;

// async function startServer() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connected successfully!');
    
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error('Database connection failed:', err);
//     process.exit(1);
//   }
// }

// startServer();

// module.exports = app;
