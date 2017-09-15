const express = require('express');
const router = express.Router();
const controller = require('controllers');

router.get('/:date?', controller.tarefas.main.find.allByDate);
router.post('/verify', controller.tarefas.main.find.verify);
router.post('/', controller.tarefas.main.insert);

module.exports = router;
