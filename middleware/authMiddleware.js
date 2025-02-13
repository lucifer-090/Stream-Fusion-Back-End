// const jwt = require('jsonwebtoken');

// const isAuthenticated = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user; // Add the authenticated user's details to the request
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };

// module.exports = isAuthenticated;

require('dotenv').config();
const jwt = require('jsonwebtoken');
// const { User } = require('../models');
const db = require("../models");
const { User } = db;

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with env secret
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
