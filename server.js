
// //Initialization
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const sequelize = require('./database');
// const db = require('./models'); // Import `db` from index.js
// const userRoute = require('./routes/userRoutes')
// const videoRoute = require('./routes/videoRoutes')
// const path = require('path')

// //Creating a Server
// const app = express();

// // ✅ Enable CORS for all origins
// app.use(cors({
//     origin: "*", // Allow requests from any frontend
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   }));
  
// //Creating a port
// const PORT = process.env.PORT || 8080

// //Creating a middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// // Serve uploaded videos
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// app.get('/login',(req, res)=>{
//     res.send("Welcome to the web page")
// })


// app.use('/users', userRoute);
// app.use('/videos', videoRoute);

// db.sequelize.sync({ alter: true }).then(() => {
//     console.log("Database synchronized!");
//     app.listen(8080, () => console.log('🚀 Server is running on port 8080'));
//   }).catch(err => console.error("Database sync error:", err));

// //Running on PORT
// app.listen(PORT, ()=>{
//     console.log(`Server Running on........................ PORT ${PORT}`)
// })

// Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const notificationRoutes = require('./routes/notificationRoutes');


// Import database and models
const db = require('./models'); // ✅ Import db from index.js
const userRoute = require('./routes/userRoutes');
const videoRoute = require('./routes/videoRoutes');

// ✅ Define PORT explicitly
const PORT = process.env.PORT || 8080; // Now it's clearly defined

// Creating a Server
const app = express();

// ✅ Enable CORS for all origins
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

// ✅ Sync Database and Start Server on the Defined PORT
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("✅ Database synchronized successfully!");
        app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
    })
    .catch(err => console.error("🔥 Database sync error:", err));
