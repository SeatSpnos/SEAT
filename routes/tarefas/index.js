const express = require('express');
const router = express.Router();

router.use('/main', require('./main.js'));
router.use('/elements', require('./elements.js'));

module.exports = router;
