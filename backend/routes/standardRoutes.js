const express = require('express');
const { getStandard } = require('../controllers/standardController');

const router = express.Router();

router.get('/:id', getStandard);

module.exports = router;
