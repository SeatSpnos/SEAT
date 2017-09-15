const express = require('express');
const router = express.Router();

router.use('/equipmentState', require('./equipmentState.js'));

module.exports = router;
