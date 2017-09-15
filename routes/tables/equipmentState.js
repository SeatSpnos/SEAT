const express = require('express');
const router = express.Router();
const controller = require('controllers');

router.get('/', controller.tables.equipstate.find);
router.put('/:id', controller.tables.equipstate.update);
router.post('/', controller.tables.equipstate.insert);

module.exports = router;
