const express = require('express');
const router = express.Router();
const controller = require('../../controllers');

router.get('/:date', controller.escala.find);
router.get('/', controller.escala.find);
router.post('/bulk', controller.escala.insert.bulk);
router.post('/one', controller.escala.insert.one);
router.put('/one/:id', controller.escala.update.one);

module.exports = router;
