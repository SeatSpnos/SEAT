const express = require('express');
const router = express.Router();
const controller = require('../../controllers').tarefas;

router.get('/all', controller.find.allTasks);
router.post('/verify', controller.find.verify);
router.get('/', controller.find.allByDate);
router.get('/:date', controller.find.allByDate);
router.post('/', controller.insert);

module.exports = router;
