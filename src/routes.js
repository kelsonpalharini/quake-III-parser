const express = require('express');

const router = express.Router();

const GameService = require('./services/gameService');

// @route  GET api/games/
// @desc   Return all games parsed
// @access Public
router.get('/api/games/', GameService.getAll);

module.exports = router;
