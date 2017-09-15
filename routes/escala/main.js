const express = require('express');
const router = express.Router();
const controller = require('controllers');

router.get('/:date?', controller.escala.main.find.allScaledUsers);
router.post('/bulk', controller.escala.main.insert.bulk);
router.post('/one', controller.escala.main.insert.one);
router.put('/one/:id', controller.escala.main.update.one);
router.delete('/one/:id', controller.escala.main.delete);

module.exports = router;
