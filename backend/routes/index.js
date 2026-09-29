const express = require('express');
const healthRoutes = require('./healthRoutes');
const recommendRoutes = require('./recommendRoutes');
const standardRoutes = require('./standardRoutes');
const feedbackRoutes = require('./feedbackRoutes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/recommend', recommendRoutes);
router.use('/standards', standardRoutes);
router.use('/feedback', feedbackRoutes);

module.exports = router;
