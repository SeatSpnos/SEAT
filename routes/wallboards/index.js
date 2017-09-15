const express = require('express');
const router = express.Router();
const controller = require('controllers');

router.get('/total/cis/:dateBegin?.:dateEnd?', controller.wallboard.totalCIs.find.allByDate);
// router.get('/:date', controller.wallboard.totalCIs.find.oneSP);

module.exports = router;
