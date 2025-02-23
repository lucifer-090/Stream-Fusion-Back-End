// Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const notificationRoutes = require('./routes/notificationRoutes');


// Import database and models
const db = require('./models'); // Import db from index.js
const userRoute = require('./routes/userRoutes');
const videoRoute = require('./routes/videoRoutes');
const commentRoutes = require("./routes/commentRoutes"); // ✅ Import comment routes

// Define PORT explicitly
const PORT = process.env.PORT || 8080; // Now it's clearly defined

// Creating a Server
const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded videos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/users', userRoute);
app.use('/videos', videoRoute);
app.use('/notifications', notificationRoutes);
app.use("/comments", commentRoutes); // ✅ Register comment routes

// Sync Database and Start Server on the Defined PORT
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log(" Database synchronized successfully!");
        app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
    })
    .catch(err => console.error(" Database sync error:", err));
