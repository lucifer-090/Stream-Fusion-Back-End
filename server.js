
//Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const userRoute = require('./routes/userRoutes')
const videoRoute = require('./routes/videoRoutes')
const path = require('path')

//Creating a Server
const app = express();

// ✅ Enable CORS for all origins
app.use(cors({
    origin: "*", // Allow requests from any frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
//Creating a port
const PORT = process.env.PORT || 8080

//Creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve uploaded videos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get('/login',(req, res)=>{
    res.send("Welcome to the web page")
})


app.use('/users', userRoute);
app.use('/videos', videoRoute);

//Running on PORT
app.listen(PORT, ()=>{
    console.log(`Server Running on........................ PORT ${PORT}`)
})