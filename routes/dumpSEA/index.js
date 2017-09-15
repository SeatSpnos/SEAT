const express = require('express');
const router = express.Router();
const controller = require('../../controllers');

router.get('/', controller.dumpSEA.page);
router.post('/', controller.dumpSEA.getData);
router.get('/', controller.dumpSEA.excel);
module.exports = router;
