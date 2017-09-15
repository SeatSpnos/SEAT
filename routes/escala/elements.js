const express = require('express');
const router = express.Router();
const controller = require('controllers');

router.get('/all', controller.escala.elements.find.allScales);
// router.get('/groups', controller.escala.elements.find.groups);
router.post('/', controller.escala.elements.insert);
router.put('/:id', controller.escala.elements.update);
router.delete('/:id', controller.escala.elements.delete);

module.exports = router;
