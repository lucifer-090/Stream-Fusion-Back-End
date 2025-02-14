const express = require('express');
const router = express.Router();
const { getNotifications } = require('../controllers/videoController');
const authenticate = require('../middleware/authMiddleware');

//Fetch notifications (only for logged-in users)
router.get('/', authenticate, getNotifications);

module.exports = router;
