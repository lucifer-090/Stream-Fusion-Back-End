const bcrypt = require('bcrypt');
//  const models = require('../models');
// const { User } = require('../models');
const db = require('../models'); // Import `db`
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const { User } = db; // Use User model from `db`

// Register a new user
exports.register = async (req, res) => {
  try {
    const { fullname, email, password, contact, address, } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashedPassword, contact, address });
    res.status(201).json({ message: 'User registered successfully!', User });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials!' });

     // Generate JWT Token
     const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,  // Use environment variable
      { expiresIn: "24h" }
    );
    //  const token = jwt.sign({ id: user.id, email: user.email }, 'HGACDhchgshdcgahsFGSFCD267362563752', 
    //   {
    //   expiresIn: '24h',
    // });

    // Respond with token and user details
    res.json({
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        message: "login Successful!!!"
      },
    });

    // res.status(200).json({ message: 'Login successful!', user });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};
