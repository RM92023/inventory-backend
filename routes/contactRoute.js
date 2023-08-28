const express = require('express');
const router = express.Router();
const protect = require('../middleWare/authMiddleware');
const { contactUS } = require('../controllers/contactController');

router.post('/', protect, contactUS);

module.exports = router;