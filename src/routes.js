const express = require('express');

const router = express.Router();

const GameService = require('./services/GameService');

// @route  GET api/games/
// @desc   Return all games parsed
// @access Public
router.get('/api/games/', GameService.getAll);

// @route  GET api/games/report
// @desc   Return a pdf report with all games
// @access Public
router.get('/api/games/report', GameService.getReport);

module.exports = router;
